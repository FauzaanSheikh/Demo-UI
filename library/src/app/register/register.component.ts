import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Subject, take, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!:FormGroup;
  subscribe:Subject<any> = new Subject<any>();

  public constructor(private sharecService: SharedService,
    private snackBar: MatSnackBar){
    this.CreateRegisterForm();
  }


  CreateRegisterForm(){
    this.registerForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null,[Validators.required, Validators.minLength(8)])
    }, { validators: this.passwordMatchValidator() });    
  }


  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): {[key: string]: any} | null => {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('confirmPassword');
  
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { 'passwordMismatch': true };
      } else {
        return null;
      }
    };
  }
  

  Register(){
    const dataObj = this.registerForm.getRawValue();
    this.sharecService.RegisterUser({email:dataObj.email,password: dataObj.password})
    .pipe(takeUntil(this.subscribe))
    .subscribe(resp=>{
      if(resp){
        this.snackBar.open('Hello, your user has been registered!', 'Close', {
          duration: 3000,
        });
      }
    },
    error => {
      console.log('Error: ', error);
    }
    );
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

}
