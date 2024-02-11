import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss']
})
export class PageSizeComponent {
  constructor(private apiService: ApiService) {}

  changePageSize(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const pageSize = parseInt(selectElement.value, 10);
    

 // If the selected value is not a number, set the page size to 10
  if (!pageSize) {
    this.apiService.setPageSize(10);
  } else {
    this.apiService.setPageSize(pageSize);
  }
    this.apiService.setCurrPage(1);
    this.apiService.getRepos(); 
    // Fetch repositories with the new page size
  }
  
}