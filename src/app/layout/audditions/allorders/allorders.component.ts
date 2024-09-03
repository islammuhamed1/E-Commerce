import { Component, inject, OnInit } from '@angular/core';
import { CheckoutService } from '../../../shared/services/checkout/checkout.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly _CheckoutService = inject(CheckoutService);
  private readonly _AuthService = inject(AuthService);
  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/allorders');
    }
    // this.getAllOrders();
    
  }
  // getAllOrders(){
  //   this._CheckoutService.getUserOrders().subscribe({
  //     next: res =>{
  //       console.log(res);
        
  //     },
  //     error: e =>{
  //       console.log(e);
        
  //     }
  //   })
  // }
}
