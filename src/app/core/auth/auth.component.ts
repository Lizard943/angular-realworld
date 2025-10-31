import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-auth.component',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private userService: UserService) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  async onSubmit(): Promise<void> {
    try {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      if (email && password) {
        const user = await this.userService.login({ email, password });
        console.log('Logged in user:', user);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
