import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  signal,
} from '@angular/core';
import { ArticlePreviewComponent } from './article-preview.component';
import { NgFor, NgIf } from '@angular/common';
import { ArticleService } from '../../../core/auth/services/article.service';
import { Article } from '../../../core/models/article.model';
import { Router } from '@angular/router';
import { SkeletonComponent } from '../../../core/layouts/skeleton/skeleton.component';

type ArticleListConfig = {
  type: string;
  filters: Object;
};

@Component({
  selector: 'app-article-list',
  imports: [ArticlePreviewComponent, SkeletonComponent],
  template: `
    @if (loading()){ @for(a of [1,2,3,4,5]; track a) {
    <app-skeleton></app-skeleton>
    } } @else if (articles().length === 0) {
    <div class="article-preview">No articles are here... yet.</div>
    } @else { @for (article of articles(); track article.id) {
    <app-article-preview
      [article]="article"
      (click)="onArticleClick(article)"
    ></app-article-preview>
    } }

    <ul class="pagination">
      <li class="page-item active">
        <a class="page-link" href="">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="">2</a>
      </li>
    </ul>
  `,
})
export class ArticleListComponent implements OnChanges {
  articles = signal<Article[]>([]);
  loading = signal<boolean>(false);
  constructor(private articleService: ArticleService, private route: Router) {}

  ngOnChanges(): void {
    this.loading.set(true);
    let request;
    if (this.config.type == 'all') {
      request = this.articleService.getGlobalArticles(this.config.filters);
    } else {
      request = this.articleService.getFeedArticles(this.config.filters);
    }
    request.then((articles) => {
      this.articles.set(articles.data);
      setTimeout(() => this.loading.set(false), 1000);
    });
  }
  onArticleClick(article: Article): void {
    void this.route.navigate(['/article', article.slug]);
  }
  @Input() config: ArticleListConfig = { type: 'all', filters: {} };
}
