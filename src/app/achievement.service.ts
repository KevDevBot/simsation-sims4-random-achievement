import { Injectable } from '@angular/core';
import { ACHIEVEMENTS, AchievementData } from './achievements';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  constructor() {
    for (const achievement of ACHIEVEMENTS) {
      if (achievement.enabled) {
        this.listOfEnabledAchievements.push(achievement);
      }
    }
  }

  showcased = new BehaviorSubject<AchievementData>(
    new AchievementData(
      'Pick an achievement!',
      'Randomly pick an achievement from the list below by clicking the dice to the right.',
      '\xa0',
      '\xa0',
      '\xa0'
    )
  );

  listOfEnabledAchievements: AchievementData[] = [];

  enableAchievement(pack: AchievementData) {
    const idx = this.listOfEnabledAchievements.findIndex(
      (p) => p.name == pack.name
    );
    if (idx < 0) {
      this.listOfEnabledAchievements.push(pack);
    }
  }

  disableAchievement(pack: AchievementData) {
    const idx = this.listOfEnabledAchievements.findIndex(
      (p) => p.name == pack.name
    );
    if (idx >= 0) {
      this.listOfEnabledAchievements.splice(idx, 1);
    }
  }
}
