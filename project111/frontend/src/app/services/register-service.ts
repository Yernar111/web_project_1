import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor (private http: HttpClient, private router: Router) {}

  signUpPage() {
    this.router.navigate(['/signup']);
  }

  logInPage() {
    this.router.navigate(['/login']);
  }

  create_user(v1: User): Observable<User>{
    return this.http.post<User>(`http://127.0.0.1:8000/users/`, v1);
  }

  get_user1(name: string, password: string): Observable<User> {
    return this.http.get<User>(`http://127.0.0.1:8000/users/${name}/${password}/`);
  }
}
