import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError, Observable, BehaviorSubject, Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class ApiService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private reposLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable(); //Loading flag for userdata
  reposLoading$ = this.reposLoadingSubject.asObservable(); //Loading flag for repos
  private searchUserName = new BehaviorSubject<string>(this.getUserNameFromLocalStorage());
  private currPage = new BehaviorSubject<number>(1);
  private repos = new BehaviorSubject<any[]>([]);
  userDataUpdated = new Subject<any>(); // Subject to notify UI components about updated user data
  private pageSizeSubject = new BehaviorSubject<number>(10); // Default page size
  pageSize$ = this.pageSizeSubject.asObservable();
  private errorSubject = new BehaviorSubject<string>('');
  private totalPagesSubject = new BehaviorSubject<number>(0);
  totalPages$: Observable<number> = this.totalPagesSubject.asObservable(); 
  range:number=10;
  private userRepos!:number;



  constructor(private http: HttpClient) {
    
    this.setPageSize(10);
   this.searchUserName.subscribe((userName) => {
      this.setUserInfoToLocalStorage(userName);
      this.pageSize$.subscribe((pageSize) => {
        const currentPage = this.currPage.value;
        this.setReposToCache(currentPage, this.range); // Call setReposToLocalStorage whenever searchUserName or pageSize changes
      });
    });
  }


  //############################## set and get username of searchbox #################################

  setUserName(searchUserName: string) {
    localStorage.setItem('searchUserName', searchUserName);
    this.searchUserName.next(searchUserName);
  }

  getUserNameFromLocalStorage(): string {
    return localStorage.getItem('searchUserName') || '';
  }


  getUserName() {
    return this.searchUserName.asObservable();
  }


  
  // ########################## UserInfo Services #################################

  setUserInfoToLocalStorage(userName: string) {
    this.isLoadingSubject.next(true);
    this.http.get(`https://api.github.com/users/${this.searchUserName.value}`).subscribe(
      (data: any) => {
        this.userRepos = data.public_repos;
        console.log(this.userRepos);
        
        localStorage.setItem('userData', JSON.stringify(data));
        // Save data to local storage
        this.setTotalPages(Math.ceil(data.public_repos / 10));
        this.userDataUpdated.next(data);
        console.log(data);
        this.isLoadingSubject.next(false); // Set loading state to false when API call is completed
      },
      (error) => {
        console.log('Error fetching user data:', error);
        this.errorSubject.next('Error fetching user data');
        this.isLoadingSubject.next(false);
      }
    );

  }

  getError(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  getUserInfoFromLocalStorage() {
    let userData = localStorage.getItem('userData');
    if (!userData) {
      localStorage.setItem('userData', JSON.stringify({}));
      userData = localStorage.getItem('userData');
    }
    return JSON.parse(userData!);
  }


  // ########################## UserRepositories Services #################################
setReposToCache(page:number, range:number) {
    this.reposLoadingSubject.next(true);
    //unique cache key
    const cacheKey = `${this.searchUserName.value}_page_${page}_range_${range}`;
    // if request is already in cache
    caches.match(`https://api.github.com/users/${this.searchUserName.value}/repos?page=${page}&per_page=${range}`).then((response) => {
      if (response) {
        // If exists in cache, return it
        response.json().then(data => {
          localStorage.setItem('userRepos', JSON.stringify(data));
          this.repos.next(data);
          this.reposLoadingSubject.next(false);
        });
      } else {
        // if not in cache, make API call and cache the response
        this.http.get<any[]>(`https://api.github.com/users/${this.searchUserName.value}/repos?page=${page}&per_page=${range}`)
          .subscribe(
            (repos: any[]) => {
              localStorage.setItem('userRepos', JSON.stringify(repos));
              this.repos.next(repos);
              this.reposLoadingSubject.next(false);
              // Cache the response for future use
              caches.open('apiCache').then(cache => {
                cache.put(`https://api.github.com/users/${this.searchUserName.value}/repos?page=${page}&per_page=${range}`, new Response(JSON.stringify(repos)));
              });
            },
            (error) => {
              console.log('Error fetching user repositories:', error);
              this.reposLoadingSubject.next(false);
            }
          );
      }
    });
  }
  

  getReposFromLocalStorage() {
  
    let userRepos = localStorage.getItem('userRepos');
    if (!userRepos) {
      localStorage.setItem('userRepos', JSON.stringify([]));
      userRepos = localStorage.getItem('userRepos');
    }
    return JSON.parse(userRepos!);
  }

  getRepos(): Observable<any[]> {
    return this.repos.asObservable();
  }



  // ########################## pagination Services #################################

  setCurrPage(curr_page: number) {
    this.currPage.next(curr_page);
  }

  getCurrPage() {
    return this.currPage.asObservable();
  }


  setTotalPages(totalPages: number) {
    this.totalPagesSubject.next(totalPages);
    console.log(this.totalPagesSubject);

  }

  getTotalPages(): Observable<number> {
    return this.totalPagesSubject.asObservable();
  }

  setPageSize(size: number) {
    this.pageSizeSubject.next(size);
    console.log(this.pageSizeSubject);
    this.calculateAndSetTotalPages();
  }

  calculateAndSetTotalPages() {
    // const repos = this.getReposFromLocalStorage();
    const pageSize = this.pageSizeSubject.value;
    const totalPages = Math.ceil(this.userRepos / pageSize);
    console.log(totalPages);
    
    this.setTotalPages(totalPages);
  }

  getPageSize(): Observable<number> {
    return this.pageSizeSubject.asObservable();
  }



}
