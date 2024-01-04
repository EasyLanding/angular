import { Component, Inject, OnInit } from '@angular/core';
import {
  ApiServiceService,
  PostI,
  SlicePostI,
  UserI,
} from '../api-service.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface UsrerIHeader {
  userName: string;
  password: string;
  email: string;
  id: number;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  posts: PostI[] = [];
  errorMessage!: string;
  title = 'Список постов';
  p: number = 1;
  showModal = false;
  logoutModal = false;
  titlePost = '';
  namePost = '';
  bodyPost = '';
  postfull = <SlicePostI>{
    title: this.titlePost,
    body: this.bodyPost,
  };
  userInfo = <UsrerIHeader>{};

  constructor(
    private myService: ApiServiceService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private toastr?: ToastrService
  ) {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.userInfo = JSON.parse(user);
      }
    }
    this.authService.checkAuth();
  }

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
        this.toastr?.success(
          'Пост успешно создан, но так как мы используем jsonplaceholder вы его не увидите :( это мок api',
          'Успешно',
          {
            timeOut: 5000,
          }
        );
        this.showModal = false;
        return;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  logout() {
    this.document.defaultView?.localStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
  }
}
