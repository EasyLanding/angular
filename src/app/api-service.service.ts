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

export type SlicePostI = Omit<PostI, 'id' | 'name'>;

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

export interface UserCreateI {
  password: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostI[]> {
    const url = `${this.baseUrl}/posts`;
    return this.http.get<PostI[]>(url);
  }

  getUserInfo(id: number): Observable<UserI> {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<UserI>(url);
  }

  deletePost(id: number): Observable<PostI> {
    const url = `${this.baseUrl}/posts/${id}`;
    return this.http.delete<PostI>(url);
  }

  createPost(title: string, body: string): Observable<SlicePostI> {
    const url = `${this.baseUrl}/posts/`;
    return this.http.post<SlicePostI>(url, {
      title: title,
      body: body,
      userId: 1,
    });
  }

  createUser(user: UserCreateI): Observable<UserCreateI> {
    const url = 'http://localhost:3000/users';
    return this.http.post<UserCreateI>(url, {
      userName: user.username,
      password: user.password,
      email: user.email,
    });
  }

  getInfoUser(id: number): Observable<UserCreateI> {
    const url = `http://localhost:3000/users/${id}`;
    return this.http.get<UserCreateI>(url);
  }
}
