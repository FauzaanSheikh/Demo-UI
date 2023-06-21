import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent {

  subscriber: Subject<any> = new Subject<any>();
  displayedColumns: string[] = ['id', 'title', 'author', 'releaseDate'];
  dataSource = [];

  constructor(private bookService: BookService){
    this.GetBookList();
  }

  ngOnInt(){
  }

  GetBookList(){
    this.bookService.GetBookList()
    .pipe(takeUntil(this.subscriber))
    .subscribe(resp=>{
      if(resp){
        this.dataSource = resp;
      }
    });
  }

}
