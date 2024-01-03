import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PostI {
  userId: number;
  id: number;
  body: string;
  title: string;
  name?: string;
}

export interface UserIAddresGeo {
  lat: string;
  lng: string;
}

export interface UserIAddres {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserIAddresGeo;
}

export interface UserICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserI {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserIAddres;
  phone: string;
  website: string;
  company: UserICompany;
}
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostI[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<PostI[]>(url);
  }

  getUserInfo(id: number): Observable<UserI> {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return this.http.get<UserI>(url);
  }
}
