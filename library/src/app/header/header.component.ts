import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  IsLoggedIn: Observable<boolean>;
  
  public constructor(private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private router: Router){
      this.IsLoggedIn = this.sharedService.LoggedInStatus;
  }
  
  ngOnInit(){
  }

  Logout(){
    this.sharedService.Logout();
    this.snackBar.open('Hello, you have successfully logged out!', 'Close', {
      duration: 5000,
    });
    this.router.navigateByUrl('/login');
  }
  
  IsAuth(){
    return this.sharedService.IsAuthenticated();
  }
}
