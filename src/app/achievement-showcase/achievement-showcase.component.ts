import { Component } from '@angular/core';
import { AchievementService } from '../achievement.service';

@Component({
  selector: 'app-achievement-showcase',
  templateUrl: './achievement-showcase.component.html',
  styleUrls: ['./achievement-showcase.component.scss'],
})
export class AchievementShowcaseComponent {
  constructor(public achievementService: AchievementService) {}

  randomize() {
    function getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (this.achievementService.listOfEnabledAchievements.length > 0) {
      this.achievementService.showcased.next(
        this.achievementService.listOfEnabledAchievements[
          getRandomInt(
            0,
            this.achievementService.listOfEnabledAchievements.length - 1
          )
        ]
      );
    } else {
      this.achievementService.listOfEnabledAchievements.length <= 0;
      alert(
        'No achievements are useable. Please enable them from the list of available achievements.'
      );
    }
  }
}
