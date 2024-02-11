import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent {

  userName: string = '';

  constructor(private apiService: ApiService) { }

  setUserName(): void {
    this.apiService.setUserName(this.userName)
  }

}
