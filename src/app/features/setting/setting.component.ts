import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/auth/services/user.service';
import { User } from '../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  imports: [ReactiveFormsModule],
})
export class SettingComponent {
  userService = inject(UserService);
  router = inject(Router);
  error = signal<boolean>(false);

  profileForm = new FormGroup({
    image: new FormControl(''),
    username: new FormControl(''),
    bio: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {
    this.profileForm.patchValue(this.userService.user() || {});
  }

  async onSubmit() {
    try {
      this.error.set(false);
      console.log('Form Values:', this.profileForm.value);
      this.userService.updateUser(this.profileForm.value as Partial<User>).then((response) => {
        this.router.navigate(['/']);
      });
    } catch (error) {
      this.error.set(true);
      console.error('Error updating profile:', error);
    }
  }
}
