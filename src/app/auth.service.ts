import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  data = {};

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const user = localStorage.getItem('currentUser');
      if (!user) {
        this.router.navigate(['/auth']);
      }
    }
  }

  checkAuth(): void {
    if (!this.data) {
      this.router.navigate(['/auth']);
      return;
    }
  }
}
