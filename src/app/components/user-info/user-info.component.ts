import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { LoaderComponent } from 'src/app/components/loader/loader.component';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  @Input() userName: any;
  private searchSubscription!: Subscription;
  private userDataSubscription!: Subscription;
  user: any;

  isError: boolean = false;
  isLoading$!: Observable<boolean>;



  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.isLoading$ = this.apiService.isLoading$;

    // Subscribe to userDataUpdated subject to get notified about changes in user data
    this.userDataSubscription = this.apiService.userDataUpdated.subscribe((data: any) => {
      this.user = data;

    });

    // getting user name from service 
    this.searchSubscription = this.apiService.getUserName().subscribe((userName) => {
      if (userName) {
        this.getUserInfo();
      } else {
        this.isError = true;
      }
    });
  }


  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }


  //getting user info data from localStorage which is saved by setUserInfoToLocalStorage() in api service
  getUserInfo() {
    const userInfo = this.apiService.getUserInfoFromLocalStorage();
    if (userInfo) {
      this.user = userInfo;
      this.apiService.setCurrPage(1);
    } else {
      this.isError = true;

    }
  }
}