import ItemModel from 'src/app/models/item.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})

export class itemsService {

  constructor(private _http: HttpClient, private _global: GlobalService) { }

  async getItems() {
    try {
      const items = await this._http.get(`${this._global.base_url}/items`, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise() as ItemModel[];
      return items;
    } catch (error) {
      throw error;
    }
  }

  async addItem(item: ItemModel) {
    try {
      await this._http.post(`${this._global.base_url}/items`, item, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise();
    } catch (error) {
      throw error;
    }
  }
}

