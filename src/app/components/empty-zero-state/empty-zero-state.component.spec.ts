import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyZeroStateComponent } from './empty-zero-state.component';

describe('EmptyZeroStateComponent', () => {
  let component: EmptyZeroStateComponent;
  let fixture: ComponentFixture<EmptyZeroStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyZeroStateComponent]
    });
    fixture = TestBed.createComponent(EmptyZeroStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
