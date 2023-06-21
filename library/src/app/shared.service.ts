import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) {
  }
  
  RegisterUser(data:any): Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    
    return this.http.post(`${environment.apiEndpoint}/api/User/Register`, data, {headers});
  }
  
  Login(data:any): Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    
    return this.http.post(`${environment.apiEndpoint}/api/User/Authenticate`, data, {headers});
  }
  
  Logout(){
    /** Since we are using jwt there is no session invalidation invloved
    * to keep things simple, I am simply removing it from the local storage
    * and not adding it to a block list etc...
    */
    alert('Logout called!');
    localStorage.removeItem(environment.jwtTokenKey);
    this.SetIsLoggedInStatus(false);
  }
  
  SetIsLoggedInStatus(isLoggedIn:boolean){
    alert('SetIsLoggedInStatus called! '+ isLoggedIn);
    this.isLoggedIn.next(isLoggedIn);
  }
  
  get LoggedInStatus(){
    return this.isLoggedIn.asObservable() ;
  }
}
