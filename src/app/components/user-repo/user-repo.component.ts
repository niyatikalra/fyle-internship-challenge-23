import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription, combineLatest } from 'rxjs';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-user-repo',
  templateUrl: './user-repo.component.html',
  styleUrls: ['./user-repo.component.scss']
})
export class UserRepoComponent implements OnInit, OnDestroy {
  private searchSubscription!: Subscription;
  private reposSubscription!: Subscription;
  private currentPageSubscription!: Subscription;
  
  userName: any;
  repos: any[] = [];
  isLoading: boolean = true;
  isError: boolean = false;
  currentPage: number = 1; // Initialize currentPage
  pageSize: number = 10; // Initialize pageSize
  reposLoadingSubject$!: Observable<boolean>;



  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.reposLoadingSubject$ = this.apiService.reposLoading$;

    // Subscribe to changes in user name
    this.searchSubscription = this.apiService.getUserName().subscribe((term) => {
      if (term) {
        this.currentPage = 1;
        this.initializeRepos();
      }
    });

    // Subscribe to changes in currPage
    this.currentPageSubscription = this.apiService.getCurrPage().subscribe((page) => {
      this.currentPage = page;
      this.getRepos();
    });

    // Subscribe to changes in page size
    this.apiService.getPageSize().subscribe((size) => {
      this.pageSize = size;
      this.getRepos();
    });


  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions to prevent memory leaks
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.reposSubscription) {
      this.reposSubscription.unsubscribe();
    }
    if (this.currentPageSubscription) {
      this.currentPageSubscription.unsubscribe();
    }
  }

  //initializing 10 repos by default
  initializeRepos() {
    this.apiService.setCurrPage(1);
    this.apiService.getRepos().subscribe((repos) => {
      this.repos = repos;
      this.isLoading = false;
    });
  }

  //getting user Repositries Data from LocalStorage so that page doesn't load
  getRepos() {
    this.isLoading = true;
    this.apiService.setReposToCache(this.currentPage, this.pageSize)
    this.apiService.getRepos().subscribe((repos) => {
      this.repos = repos;
      this.isLoading = false;
    });
  }


}  