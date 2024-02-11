import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  totalPages: number = 0;
  currentPage: number = 1; // Set the current page to 1 by default
  private totalPagesSubscription!: Subscription;


  constructor(private apiService: ApiService) { }


  ngOnInit() {
    // Subscribe to changes in total pages
    this.totalPagesSubscription = this.apiService.getTotalPages().subscribe(totalPages => {
      this.totalPages = totalPages;
    });

    // Subscribe to changes in current page
    this.apiService.getCurrPage().subscribe(currPage => {
      if (currPage) this.currentPage = currPage;
    });

  }


  changePage(page: number) {
    this.currentPage = page;
    this.apiService.setCurrPage(this.currentPage);
    this.apiService.getReposFromLocalStorage();

  }

}
