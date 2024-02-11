import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserInfoComponent } from './user-info.component';
import { ApiService } from 'src/app/services/api.service';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['isLoading$', 'getUserInfoFromLocalStorage', 'setCurrPage']);
    await TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component and subscribe to isLoading$', () => {
    expect(component.isLoading$).toBeTruthy();
  });

  it('should call getName() when userName is present', () => {
    const mockUserName = 'testUserName';
    component.userName = mockUserName;
    spyOn(component, 'getUserInfo');
    fixture.detectChanges();
    expect(component.getUserInfo).toHaveBeenCalled();
  });

  it('should handle data retrieval from local storage when userName is present', () => {
    const mockUserInfo = { name: 'Test User' };
    apiService.getUserInfoFromLocalStorage.and.returnValue(mockUserInfo);
    component.getUserInfo();
    expect(component.user).toEqual(mockUserInfo);
    expect(apiService.setCurrPage).toHaveBeenCalledWith(1);
    expect(component.isError).toBeFalsy();
  });

  it('should handle error when data retrieval from local storage fails', () => {
    apiService.getUserInfoFromLocalStorage.and.returnValue(null);
    component.getUserInfo();
    expect(component.user).toBeUndefined();
    expect(apiService.setCurrPage).not.toHaveBeenCalled();
    expect(component.isError).toBeTrue();
  });


});
