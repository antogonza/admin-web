import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.API_URL}products?limit=100`, { headers });
  }

  getProductById(productId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.API_URL}products/${productId}`, { headers });
  }

  updateProduct(productId: string, productData: Product) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      "photo": productData.photo,
      "name": productData.name,
      "ingredients": productData.ingredients,
      "isMultiSize": productData.type == 'PIZZA',
      "priceBig": productData.priceBig,
      "priceMedium": productData.priceMedium,
      "priceSmall": productData.priceSmall,
      "discount": productData.discount,
      "type": productData.type,
    };

    console.log(productData);
    return this.http.patch(`${environment.API_URL}products/${productId}`, body, { headers });
  }

  createProduct(productData: Product) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      "photo": productData.photo,
      "name": productData.name,
      "ingredients": productData.ingredients,
      "isMultiSize": productData.type == 'PIZZA',
      "priceBig": productData.priceBig,
      "priceMedium": productData.priceMedium ?? 0,
      "priceSmall": productData.priceSmall ?? 0,
      "discount": productData.discount,
      "type": productData.type,
      "stock": 100,
    };

    console.log(productData);
    return this.http.post(`${environment.API_URL}products`, body, { headers });
  }
}
