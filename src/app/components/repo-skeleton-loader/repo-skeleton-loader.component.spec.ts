import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoSkeletonLoaderComponent } from './repo-skeleton-loader.component';

describe('RepoSkeletonLoaderComponent', () => {
  let component: RepoSkeletonLoaderComponent;
  let fixture: ComponentFixture<RepoSkeletonLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoSkeletonLoaderComponent]
    });
    fixture = TestBed.createComponent(RepoSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
