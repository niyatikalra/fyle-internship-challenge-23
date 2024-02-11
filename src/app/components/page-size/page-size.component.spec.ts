import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageSizeComponent } from './page-size.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { SearchUserComponent } from '../search-user/search-user.component';

describe('PageSizeComponent', () => {
  let component: PageSizeComponent;
  let fixture: ComponentFixture<PageSizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageSizeComponent, SearchUserComponent], // Add SearchUserComponent here
      imports: [HttpClientModule]
    });
    fixture = TestBed.createComponent(PageSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});