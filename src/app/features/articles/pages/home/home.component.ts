import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/auth/services/user.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { IfAuthenticatedDirective } from '../../../../core/auth/ifAuthenticated.directive';
import { ArticleListComponent } from '../../components/article-list.component';

type ArticleListConfig = {
  type: string;
  filters: Object;
};

@Component({
  selector: 'app-home',
  imports: [NgClass, IfAuthenticatedDirective, ArticleListComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  constructor(private readonly router: Router, private readonly userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.isAuthenticated()) {
      this.setListTo('feed');
    } else {
      this.setListTo('all');
    }
  }

  setListTo(type: string = '', filters: Object = {}): void {
    if (type === 'feed' && !this.userService.isAuthenticated()) {
      void this.router.navigate(['/login']);
      return;
    }

    // Otherwise, set the list object
    this.listConfig = { type: type, filters: filters };
  }
}
