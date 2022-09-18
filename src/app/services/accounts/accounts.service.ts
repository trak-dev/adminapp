import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import UserModel from '../../models/user.model';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _http: HttpClient, private _global: GlobalService) { }

  async login(email: string, password: string) {
    try {    
      const loginData = await this._http.post(`${this._global.base_url}/users/login`, {email, password}).toPromise();
      return loginData as {token: string, user: UserModel}; 
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this._global.user = new UserModel();
    this._global.token = "";
    window.location.href = "/login";
  }

  async getUsers() {
    try {
      const users = await this._http.get(`${this._global.base_url}/users/get`, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise() as UserModel[];
      return users;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: number) {
    try {
      await this._http.delete(`${this._global.base_url}/users/${userId}`, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async setAdmin(userId: number) {
    try {
      await this._http.patch(`${this._global.base_url}/users/${userId}/toggle-admin`, {}, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise();
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await this._http.get(`${this._global.base_url}/users/${userId}`, {headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      })}).toPromise() as UserModel;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
