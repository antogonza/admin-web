import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrdersByStatus(status: string) {
    const token = localStorage.getItem('token');
    const local = localStorage.getItem('local');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'local': `${local}`
    });

    return this.http.get(`${environment.API_URL}orders/status/${status}`, { headers });
  }

  getOrdersByLocal() {
    const token = localStorage.getItem('token');
    const local = localStorage.getItem('local');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'local': `${local}`
    });

    return this.http.get(`${environment.API_URL}orders/locals`, { headers });
  }

  changeOrderStatus(orderId: string, newStatus: string) {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = { 'status': newStatus };

    return this.http.patch(`${environment.API_URL}orders/status/${orderId}`, body, { headers });

  }
}
