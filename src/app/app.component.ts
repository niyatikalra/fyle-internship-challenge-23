import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  errorMessage: boolean = false;
  private userDataSubscription!: Subscription;
  private errorSubscription!: Subscription;
  dataComing: boolean = false

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.errorSubscription = this.apiService.getError().subscribe(error => {
      if (error) this.errorMessage = true;
      this.dataComing = false;
      console.log("data nhi error aaya", this.errorMessage);

    });

    this.userDataSubscription = this.apiService.userDataUpdated.subscribe((data: any) => {
      if (data) this.dataComing = true;
      this.errorMessage = false;
      console.log('data aagya', this.dataComing);

    })


  }


}
