import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService, PostI } from '../api-service.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AuthService } from '../auth.service';
import { UsrerIHeader } from '../home/home.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  imports: [CommonModule],
})
export class ArticleComponent implements OnInit {
  post?: PostI;
  errorMessage!: string;
  user = <UsrerIHeader>{};
  showModal = false;

  constructor(
    private route: ActivatedRoute,
    private postService: ApiServiceService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.user = JSON.parse(user);
      }
    }
    this.authService.checkAuth();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(Number(id)).subscribe({
      next: (post) => {
        this.post = post;
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
