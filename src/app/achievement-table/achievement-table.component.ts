import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AchievementData, ACHIEVEMENTS } from '../achievements';
import { Sort } from '@angular/material/sort';
import { AchievementService } from '../achievement.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-achievement-table',
  templateUrl: './achievement-table.component.html',
  styleUrls: ['./achievement-table.component.scss'],
})
export class AchievementTableComponent implements OnInit, OnDestroy {
  constructor(
    breakpointObserver: BreakpointObserver,
    public achievementService: AchievementService
  ) {
    breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        this.isSmallScreen = true;
      }
    });
    breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Web])
      .subscribe((result) => {
        if (result.matches) {
          this.isSmallScreen = false;
        }
      });
  }

  isSmallScreen: boolean = false;

  ngOnInit() {
    this.achievementService.showcased.subscribe(this.scrollToAchievement);
  }

  ngOnDestroy() {
    this.achievementService.showcased.unsubscribe();
  }

  fullTableDisplay: string[] = [
    'achievement-toggle',
    'achievement',
    'description',
    'pack',
    'category',
    'points',
  ];

  tinyTableDisplay: string[] = ['achievement'];

  dataSource = new MatTableDataSource(ACHIEVEMENTS);

  toggleAchievement(achievement: AchievementData) {
    achievement.enabled = !achievement.enabled;
    achievement.enabled
      ? this.achievementService.enableAchievement(achievement)
      : this.achievementService.disableAchievement(achievement);
  }

  sortAchievements(sort: Sort) {
    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return compareAsc(a < b ? -1 : 1, isAsc);
    }

    function compareAsc(val: number, isAsc: boolean) {
      return val * (isAsc ? 1 : -1);
    }

    function compareToggle(
      aEnabled: boolean,
      aName: string,
      bEnabled: boolean,
      bName: string,
      isAsc: boolean
    ) {
      if (aEnabled && !bEnabled) {
        return compareAsc(1, isAsc);
      } else if (!aEnabled && bEnabled) {
        return compareAsc(-1, isAsc);
      } else {
        return compare(aName, bName, true);
      }
    }

    let sortedData = [];
    const data = ACHIEVEMENTS.slice();
    if (!sort.active || sort.direction === '') {
      sortedData = data;
      return;
    }

    sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'achievement-toggle':
          return compareToggle(a.enabled, a.name, b.enabled, b.name, isAsc);
        case 'achievement':
          return compare(a.name, b.name, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'points':
          return compare(a.points, b.points, isAsc);
        case 'pack':
          return compare(a.pack, b.pack, isAsc);
        case 'category':
          return compare(a.category, b.category, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource = new MatTableDataSource(sortedData);
  }

  scrollToAchievement(val: AchievementData) {
    if (val.name) {
      document.getElementById(`achv-${val.name}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      });
    }
  }
}
