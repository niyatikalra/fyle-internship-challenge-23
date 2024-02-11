import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRepoComponent } from './user-repo.component';

describe('UserRepoComponent', () => {
  let component: UserRepoComponent;
  let fixture: ComponentFixture<UserRepoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRepoComponent]
    });
    fixture = TestBed.createComponent(UserRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
