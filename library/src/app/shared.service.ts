import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  
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
    localStorage.removeItem(environment.jwtTokenKey);
  }
}
