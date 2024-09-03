import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  errorMsg!: boolean;
  isLoading:boolean = false;
  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
      rePassword: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.rePasswordSubmit }
  );
  submitRegister() {
    this.isLoading=true;
    this._AuthService.signUp(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading=false;
        this._Router.navigate(['/login']);
        console.log(res);
      },
      error: (e) => {
        this.isLoading=false;
        this.errorMsg = e.error.message
        console.log(e);
      },
    });
    console.log(this.registerForm);
  }
  rePasswordSubmit(a: AbstractControl) {
    if (a.get('password')?.value === a.get('rePassword')?.value) {
      return null;
    } else {
      a.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
}
