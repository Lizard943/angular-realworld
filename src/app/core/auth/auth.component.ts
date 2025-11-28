import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { User } from '../models/user.model';

@Component({
  selector: 'app-auth.component',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private userService: UserService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  ngOnInit(): void {
    if (this.router.url.includes('register')) {
      this.loginForm.addControl('username', new FormControl(''));
    }
  }
  error = signal<boolean>(false);
  async onSubmit(): Promise<void> {
    this.error.update(() => false);
    let promise: Promise<User>;
    if (this.router.url.includes('register')) {
      promise = this.userService.register(this.loginForm.value);
    } else {
      promise = this.userService.login(this.loginForm.value);
    }
    try {
      const user = await promise;
      console.log('Logged in user:', user);
      this.router.url.includes('register')
        ? this.router.navigateByUrl('/login')
        : this.router.navigateByUrl('/');
    } catch (error) {
      this.error.update(() => true);
    }
  }
}
