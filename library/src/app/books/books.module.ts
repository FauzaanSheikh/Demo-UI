import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListingComponent } from './book-listing/book-listing.component';
import { BooksRoutingModule } from './books-routing.module';



@NgModule({
  declarations: [
    BookListingComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
