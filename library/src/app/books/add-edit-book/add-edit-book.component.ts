import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent {
  
  bookForm!:FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEditBookComponent>,private bookService: BookService, @Inject(MAT_DIALOG_DATA) public data: any = {}){
    this.CreateBookForm(data);
  }

  CreateBookForm(data:any=null){
    this.bookForm = new FormGroup({
      id: new FormControl((data?.id || 0)),
      title: new FormControl((data?.title || null),[Validators.required]),
      author: new FormControl((data?.author || null),[Validators.required]),
      releaseDate: new FormControl((data?.releaseDate || null),[Validators.required])
    });
  }

  Save(){
    if(this.data==null){
      this.bookService.AddBook(this.bookForm.getRawValue())
      .subscribe({
        next: (v) => {
          if(v){
            alert('Book Added');
            this.dialogRef.close();
          }
        },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    }else{
      this.bookService.EditBook(this.bookForm.getRawValue())
      .subscribe({
        next: (v) => {
          if(v){
            alert('Book Updated');
            this.dialogRef.close();
          }
        },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
    }
    this.dialogRef.close();
  }
}
