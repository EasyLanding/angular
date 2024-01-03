import { Component, OnInit } from '@angular/core';
import { ApiServiceService, PostI } from '../api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  posts: PostI[] = [];
  errorMessage!: string;
  constructor(private myService: ApiServiceService) {}

  ngOnInit(): void {
    this.myService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
