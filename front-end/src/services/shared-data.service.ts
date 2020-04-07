import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseurl2, baseurl, bureaUrl } from './config';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  products: string[] = ['mango', 'ice'];
  constructor(
    private http: HttpClient
  ) { }

  addProduct(data) {
    return this.http.post(bureaUrl + 'saveClientProduct', data);
  }

  getProduct(page?: number) {
    return this.http.post(bureaUrl + 'getClientProducts', {page: page || 1});
  }

  deleteProduct(id: string) {
    return this.http.post(bureaUrl + 'deleteClientProduct', {productid: id});

  }

}
