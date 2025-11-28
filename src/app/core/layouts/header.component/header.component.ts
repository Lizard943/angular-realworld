import { Component, inject } from '@angular/core';
import { IfAuthenticatedDirective } from '../../auth/ifAuthenticated.directive';
import { CommonModule } from '@angular/common';
import { UserService } from '../../auth/services/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, IfAuthenticatedDirective, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  userService = inject(UserService);

  ngOnInit(): void {}
}
