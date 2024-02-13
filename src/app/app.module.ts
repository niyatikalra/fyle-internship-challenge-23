import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';

import { SearchUserComponent } from './components/search-user/search-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserRepoComponent } from './components/user-repo/user-repo.component';
import { PageSizeComponent } from './components/page-size/page-size.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EmptyZeroStateComponent } from './components/empty-zero-state/empty-zero-state.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RepoSkeletonLoaderComponent } from "./components/repo-skeleton-loader/repo-skeleton-loader.component"




@NgModule({
  declarations: [
    AppComponent,
    SearchUserComponent,
    UserInfoComponent,
    UserRepoComponent,
    PageSizeComponent,
    LoaderComponent,
    EmptyZeroStateComponent,
    PaginationComponent,
    RepoSkeletonLoaderComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
