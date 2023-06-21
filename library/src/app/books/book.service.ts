import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AddEditBookComponent } from './add-edit-book/add-edit-book.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  constructor(private http: HttpClient,
    private matDialog: MatDialog) { }
    
    displayAddEditDialog(data:any=null, callBackFunc: Function = ()=>{}) {
      const dialogRef = this.matDialog.open(AddEditBookComponent, {data});
      
      dialogRef.afterClosed().subscribe(result => {
        callBackFunc();
      });
    }
    
    GetBookList(): Observable<any>{    
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem(environment.jwtTokenKey));
      
      return this.http.get(`${environment.apiEndpoint}/api/Books`, {headers});
    }
    
    AddBook(request:any): Observable<any>{    
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem(environment.jwtTokenKey));
      
      return this.http.post(`${environment.apiEndpoint}/api/Books`, request, {headers});
    }

    EditBook(request:any): Observable<any>{    
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem(environment.jwtTokenKey));
      
      return this.http.put(`${environment.apiEndpoint}/api/Books/${request.id}`, request, {headers});
    }

    DeleteBook(request:any): Observable<any>{    
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem(environment.jwtTokenKey));
      
      return this.http.delete(`${environment.apiEndpoint}/api/Books/${request.id}`, {headers});
    }
  }
  