import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, Comment } from '../../../../core/models/article.model';
import { ArticleService } from '../../../../core/auth/services/article.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-articles',
  imports: [DatePipe],
  templateUrl: './article.component.html',
})
export class ArticlesComponent {
  article = signal<Article>({} as Article);
  comment = signal<Comment[]>([] as Comment[]);
  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}
  ngOnInit(): void {
    this.article.set(this.route.snapshot.data['article'].data);
    this.articleService
      .getComment(this.route.snapshot.data['article'].data?.slug || '')
      .then((res) => {
        this.comment.set(res.data);
      });
  }
}
