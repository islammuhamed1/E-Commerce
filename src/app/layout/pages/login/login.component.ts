import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  errorMsg!: boolean;
  isLoading:boolean = false;
  loginForm: FormGroup = this._FormBuilder.group(
    {
     
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
    
    },
  );
  submitLogin() {
    this.isLoading=true;
    this._AuthService.signin(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading=false;
        if (typeof localStorage != 'undefined') {
          localStorage.setItem('userToken' , res.token) 
          this._AuthService.decodeData();         
        }
        this._Router.navigate(['/home']);
        console.log(res);
      },
      error: (e) => {
        this.isLoading=false;
        this.errorMsg = e.error.message
        console.log(e);
      },
    });
    console.log(this.loginForm);
  }
}
