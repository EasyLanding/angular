import { Component, OnInit } from '@angular/core';
import {
  ApiServiceService,
  PostI,
  SlicePostI,
  UserI,
} from '../api-service.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  posts: PostI[] = [];
  errorMessage!: string;
  title = 'Список постов';
  p: number = 1;
  showModal = false;
  titlePost = '';
  namePost = '';
  bodyPost = '';
  postfull = <SlicePostI>{
    title: this.titlePost,
    body: this.bodyPost,
  };

  constructor(private myService: ApiServiceService) {}

  ngOnInit(): void {
    this.myService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;

        // Проходим по каждому посту и делаем запрос на получение информации о пользователе
        for (let i = 0; i < this.posts.length; i++) {
          this.myService.getUserInfo(this.posts[i].userId).subscribe({
            next: (user: UserI) => {
              // Добавляем имя пользователя в поле username объекта поста
              this.posts[i].name = user.name;
            },
            error: (error) => {
              this.errorMessage = error;
            },
          });
        }
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  onDeletePosts(id: number) {
    this.myService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== id);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  onSavePost() {
    this.myService.createPost(this.titlePost, this.bodyPost).subscribe({
      next: (posts) => {
        console.log(posts);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
