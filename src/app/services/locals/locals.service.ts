import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalsService {

  constructor(private http: HttpClient) { }

  getOneLocal() {
    const token = localStorage.getItem('token');
    const local = localStorage.getItem('local');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.API_URL}locals/id/${local}`, { headers });
  }

  updateLocal(any: any) {

    const token = localStorage.getItem('token');
    const local = localStorage.getItem('local');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(any);


    return this.http.patch(`${environment.API_URL}locals/id/${local}`, any, { headers });

  }

  openLocal() {
    const token = localStorage.getItem('token');
    const local = localStorage.getItem('local');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch(`${environment.API_URL}locals/id/${local}/open`, {}, { headers });
  }

  closeLocal() {
    const token = localStorage.getItem('token');
    const local = localStorage.getItem('local');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(headers);


    return this.http.patch(`${environment.API_URL}locals/id/${local}/close`, {}, { headers });
  }
}
