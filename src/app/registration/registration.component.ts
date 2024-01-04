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

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  registrationForm?: FormGroup;
  errorMessage!: string;
  title = 'Регистрация';
  username = '';
  email = '';
  password = '';
  confirm_password = '';

  private formBuilder = inject(FormBuilder);

  constructor(
    private myService: ApiServiceService,
    private toastr?: ToastrService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', Validators.required],
      confirm_password: [''],
    });
  }

  get f(): any {
    return this.registrationForm?.controls;
  }

  onSaveRegistration() {
    if (this.registrationForm?.invalid) {
      this.toastr?.error('Заполните все поля формы', 'Ошибка валидации', {
        timeOut: 5000,
      });
      return;
    }

    this.myService.createUser(this.registrationForm?.value).subscribe({
      next: (user) => {
        this.toastr?.success('Успешная регистрация', 'Успешно', {
          timeOut: 5000,
        });
        localStorage.setItem('currentUser', JSON.stringify(user));
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
