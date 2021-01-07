import { Component } from '@angular/core';
import { AchievementService } from './achievement.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Simsation - Sims 4 Random Achievement';

  constructor(public achievementService: AchievementService) {}
}
