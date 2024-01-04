import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authForm?: FormGroup;
  errorMessage!: string;
  title = 'Авторизация';
  email = '';
  password = '';

  private formBuilder = inject(FormBuilder);

  constructor(
    private myService: ApiServiceService,
    private router: Router,
    private toastr?: ToastrService
  ) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f(): any {
    return this.authForm?.controls;
  }

  onLogin() {
    if (this.authForm?.invalid) {
      this.toastr?.error('Заполните все поля формы', 'Ошибка валидации', {
        timeOut: 5000,
      });
      return;
    }
    const user = localStorage.getItem('currentUser');

    if (
      user === null ||
      JSON.parse(user).email !== this.authForm?.value.email ||
      JSON.parse(user).password !== this.authForm?.value.password
    ) {
      this.toastr?.error(
        'Не совпадают поля из локалстораджа логин или пароль',
        'Ошибка логина',
        {
          timeOut: 5000,
        }
      );
      return;
    }
    this.router.navigate(['/']);
  }
}
