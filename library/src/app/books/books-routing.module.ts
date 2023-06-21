import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksModule } from './books.module';
import { BookListingComponent } from './book-listing/book-listing.component';

const routes: Routes = [
  { path: '', component: BookListingComponent },
  { path: 'book-list', component: BookListingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
