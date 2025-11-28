import { Component, inject, signal } from '@angular/core';
import { ArticleService } from '../../../core/auth/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleListComponent } from '../../articles/components/article-list.component';
import { ProfileService } from '../../../core/auth/services/profile.service';
import { Article, Profile } from '../../../core/models/article.model';

@Component({
  selector: 'app-profile',
  imports: [ArticleListComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  route = inject(ActivatedRoute);
  profileService = inject(ProfileService);
  articleService = inject(ArticleService);
  config = { type: 'all', filters: {} };
  profile = signal<Profile | undefined>(undefined);
  articles = signal<Article[]>([]);

  ngOnInit() {
    this.profileService
      .getProfile<Profile>(this.route.snapshot.paramMap.get('username')!)
      .then((profile) => {
        this.profile.set(profile.data);
        this.config = { type: 'all', filters: { author: this.profile()?.username || '' } };
      });
  }
}
