import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListingComponent } from './book-listing/book-listing.component';
import { BooksRoutingModule } from './books-routing.module';
import { MatTableModule } from '@angular/material/table';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    BookListingComponent,
    AddEditBookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BooksModule { }
