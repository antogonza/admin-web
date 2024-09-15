import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discount } from 'src/app/interfaces/discount.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(private http: HttpClient) { }

  getAllDiscounts() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.API_URL}discounts`, { headers });
  }

  getDiscountById(id: string) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.API_URL}discounts/id/${id}`, { headers });
  }

  updateDiscount(id: string, discountData: Discount) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch(`${environment.API_URL}discounts/id/${id}`, discountData, { headers });
  }

  createDiscount(discountData: Discount) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${environment.API_URL}discounts`, discountData, { headers });
  }
}
