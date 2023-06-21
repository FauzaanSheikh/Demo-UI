import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup;
  subscriber:Subject<any>=new Subject<any>();

  public constructor(private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private router: Router){
    this.CreateLoginForm();
  }

  CreateLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)])
    });
  }

  Login(){
    this.sharedService.Login(this.loginForm.getRawValue())
    .pipe(takeUntil(this.subscriber))
    .subscribe(resp=>{
      if(resp){
        localStorage.setItem(environment.jwtTokenKey ,resp?.token || '');
        localStorage.setItem('lib-user' ,resp?.email || '');
        this.snackBar.open('Hello, you have successfully logged in!', 'Close', {
          duration: 3000,
        });
        this.router.navigateByUrl('/book-list');
      }
    },
    error => {
      console.log('Error: ', error);
    }
    );
  }

}
