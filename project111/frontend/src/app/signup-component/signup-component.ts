import { Component } from '@angular/core';
import { User } from '../models/user';
import { RegisterService } from '../services/register-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
export class SignupComponent {
  constructor(private registerservice: RegisterService, private router: Router) {}
  name: string = '';
  password: string = '';
  
  user: User = {id: 0, name: '', password: ''};

  isError: boolean = false;

  signUp1() {
    this.user.name = this.name;
    this.user.password = this.password;

    this.registerservice.create_user(this.user).subscribe({
      next: (user1) => {
        this.isError = false;
        console.log("signed up as:", user1);
        this.router.navigate(['/categories', user1.id]);
      },
      error: (err) => {
        this.isError = true;
        console.log(err);
      }
    });
  } //
}
