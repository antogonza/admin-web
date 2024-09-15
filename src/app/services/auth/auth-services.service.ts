import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { email, password };

    return this.http.post(`${environment.API_URL}auth/login-admin`, body, { headers });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('local');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  getAllUsers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.API_URL}auth/users`, { headers });
  }

}
