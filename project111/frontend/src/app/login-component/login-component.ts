import { Component } from '@angular/core';
import { RegisterService } from '../services/register-service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  constructor(private registerservice: RegisterService, private router: Router) {}

  name: string = '';
  password: string = '';
  isError: boolean = false;

  user1$!: Observable<User>;

  logIn1() {
    this.user1$ = this.registerservice.get_user1(this.name, this.password);
    this.user1$.subscribe({
      next: (user1) => {
        this.isError = false
        console.log("logged in as:", user1)

        this.router.navigate(['/categories', user1.id])
      },
      error: (err) => {
        this.isError = true
        console.log(err)
      },
    });
  }
}
