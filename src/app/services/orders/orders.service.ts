import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import OrderModel from 'src/app/models/order.model';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(private _http: HttpClient, private _global: GlobalService) { }


  async getOrders() {
    try {
      const orders = await this._http.get(`${this._global.base_url}/orders/get`, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise() as OrderModel[];
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(orderId: number) {
    try {
      await this._http.delete(`${this._global.base_url}/orders/admin/${orderId}`, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async deliverOrder(orderId: number) {
    try {
      await this._http.patch(`${this._global.base_url}/orders/deliver/${orderId}`, {}, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise();
    } catch (error) {
      throw error;
    }
  }
}

