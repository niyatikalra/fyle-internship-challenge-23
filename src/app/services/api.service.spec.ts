import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test setUserInfoToLocalStorage method
  it('should set user info to local storage', () => {
    const testUserName = 'testUser';
    const testData = { name: 'testName', login: 'testLogin' };

    service.setUserName(testUserName);

    const req = httpMock.expectOne(`https://api.github.com/users/${testUserName}`);

    req.flush(testData);

    expect(localStorage.getItem('userData')).toEqual(JSON.stringify(testData));
  });

  // Test setReposToLocalStorage method
  it('should set repos to local storage', () => {
    const testUserName = 'testUser';
    const testRepos = [{ name: 'testRepo1' }, { name: 'testRepo2' }];

    service.setUserName(testUserName);

    const req = httpMock.expectOne(`https://api.github.com/users/${testUserName}/repos`);

    req.flush(testRepos);

    expect(localStorage.getItem('userRepos')).toEqual(JSON.stringify(testRepos));
  });

  // Test getUserInfoFromLocalStorage method
  it('should get user info from local storage', () => {
    const testData = { name: 'testName', login: 'testLogin' };
    localStorage.setItem('userData', JSON.stringify(testData));

    expect(service.getUserInfoFromLocalStorage()).toEqual(testData);
  });

  // Test getReposFromLocalStorage method
  it('should get repos from local storage', () => {
    const testRepos = [{ name: 'testRepo1' }, { name: 'testRepo2' }];
    localStorage.setItem('userRepos', JSON.stringify(testRepos));

    expect(service.getReposFromLocalStorage()).toEqual(testRepos);
  });



});
