import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router)
  step: number = 1;
  private readonly _FormBuilder = inject(FormBuilder);
  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });
  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  });
  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^\w{6,}$/)]
    ],
  });
  verifyEmailSubmit(): void {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue)
    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if ((res.statusMsg = 'success')) this.step = 2;
      },
    });
  }
  verifyCodeSubmit(): void {
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if ((res.statusMsg = 'Success')) this.step = 3;
      },
    });
  }
  resetPasswordSubmit(): void {
    this._AuthService.setPasswordVerify(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('userToken' , res.token) 
        this._AuthService.decodeData();
        this._Router.navigate(['/home']);
        
      }
    })
  }
}
