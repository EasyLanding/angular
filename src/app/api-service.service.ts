import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PostI {
  userId: number;
  id: number;
  body: string;
  title: string;
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
}
