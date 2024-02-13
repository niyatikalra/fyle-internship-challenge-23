import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss']
})
export class PageSizeComponent {
  constructor(private apiService: ApiService) {}

  currentPage!: number; // Set the current page to 1 by default
  // PageSize!: number;

  ngOnInit() {

    // Subscribe to changes in current page
    this.apiService.getCurrPage().subscribe(currPage => {
      if (currPage) this.currentPage = currPage;
    });

  }

  changePageSize(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const pageSize = parseInt(selectElement.value, 10);
    

 // If no selected value, set the page size to 10
  if (!pageSize) {
    this.apiService.setPageSize(10);
  } else {
    this.apiService.setPageSize(pageSize);
  }
  this.apiService.setPageSize(pageSize);
  this.apiService.setCurrPage(this.currentPage);
  this.apiService.calculateAndSetTotalPages();

  this.apiService.setReposToCache(this.currentPage,pageSize)

  this.apiService.getRepos(); 
    // Fetch repositories with the new page size
  }
  
}