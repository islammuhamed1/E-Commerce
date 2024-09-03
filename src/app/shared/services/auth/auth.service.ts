import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ireg, Ilogin } from '../../interfaces/idata';
import { baseUrl } from '../../../base/enviroment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  constructor() {
    if (typeof localStorage != 'undefined') {
      const userToken = localStorage.getItem('userToken');
      if (userToken != null) {
        this.decodeData();
        const currentPage = localStorage.getItem('currentPage');
        if (currentPage) {
          this._Router.navigate([currentPage]);
        } else {
          this._Router.navigate(['/']); 
        }
      }
    }
  }
  
  signUp(data: Ireg): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/auth/signup`, data);
  }
  signin(data: Ilogin): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/auth/signin`, data);
  }

  decodeData() {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decoded = jwtDecode(token);
      this.userData.next(decoded);
      console.log(this.userData.getValue());
    }
  }
  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
  setEmailVerify(data: object): Observable<any> {
    return this._HttpClient.post(
      `${baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  setCodeVerify(data: object): Observable<any> {
    return this._HttpClient.post(
      `${baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  setPasswordVerify(data: object): Observable<any> {
    return this._HttpClient.put(`${baseUrl}/api/v1/auth/resetPassword`, data);
  }
}
