import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementShowcaseComponent } from './achievement-showcase.component';

describe('AchievementShowcaseComponent', () => {
  let component: AchievementShowcaseComponent;
  let fixture: ComponentFixture<AchievementShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
