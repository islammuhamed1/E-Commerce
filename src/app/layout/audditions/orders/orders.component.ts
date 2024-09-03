import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../../shared/services/checkout/checkout.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  cardId: string | null = '';
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CheckoutService = inject(CheckoutService);
  orders: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cardId = params.get('id');
      },
    });
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/orders');
    }
  }

  orderSubmit() {
    console.log(this.orders.value);
    this._CheckoutService.checkOut(this.cardId, this.orders.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          window.open(res.session.url , '_self');
        }
      },
      error: (e) => {},
    });
  }
}
