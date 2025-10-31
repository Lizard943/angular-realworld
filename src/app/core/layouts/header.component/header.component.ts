import { Component, inject } from '@angular/core';
import { IfAuthenticatedDirective } from '../../auth/ifAuthenticated.directive';
import { CommonModule } from '@angular/common';
import { UserService } from '../../auth/services/user.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, IfAuthenticatedDirective],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUser = inject(UserService).user();
}
