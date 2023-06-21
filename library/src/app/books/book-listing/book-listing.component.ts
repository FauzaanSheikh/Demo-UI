import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Subject, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditBookComponent } from '../add-edit-book/add-edit-book.component';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent {
  
  subscriber: Subject<any> = new Subject<any>();
  displayedColumns: string[] = ['id', 'title', 'author', 'releaseDate', 'actions'];
  dataSource = [];
  
  constructor(private bookService: BookService,
    private sharedService: SharedService,
    private matDialog: MatDialog){
      this.GetBookList();
    }
    
    GetBookList(){
      this.bookService.GetBookList()
      .pipe(takeUntil(this.subscriber))
      .subscribe(resp=>{
        if(resp){
          this.dataSource =resp;
        }
      });
    }
    
    Edit(row:any) {
      console.log(row);
      this.bookService.displayAddEditDialog(row, () => {this.GetBookList()});
    }
    
    Delete(row:any) {
      console.log(row);
      this.bookService.DeleteBook(row)
      .subscribe({next: (v) => {
        if(v){
          alert('Book Deleted!');
        }
      },
      error: (e) => console.error(e),
      complete: () => this.GetBookList() });
    }
    
    Add(){
      this.bookService.displayAddEditDialog(null, () => {this.GetBookList()});
    }
    
  }
  