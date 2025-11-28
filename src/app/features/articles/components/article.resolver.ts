import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ArticleService } from '../../../core/auth/services/article.service';

@Injectable({ providedIn: 'root' })
export class ArticlesResolver implements Resolve<any> {
  constructor(private articleService: ArticleService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.paramMap.get('slug');
    return this.articleService.getArticleBySlug(slug!);
  }
}
