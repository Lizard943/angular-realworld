import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Article, Comment } from '../../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpService) {}

  getGlobalArticles(filters: { [key: string]: any }) {
    return this.http.get<Article[]>('/articles', filters);
  }
  getFeedArticles(filters: { [key: string]: any }) {
    return this.http.get<Article[]>('/articles/feed', filters);
  }
  getArticleBySlug(slug: string) {
    return this.http.get<Article>(`/articles/${slug}`, {});
  }
  createArticle(article: any) {
    return this.http.post<{ article: Article }>('/articles', article);
  }

  getComment(slug: string) {
    return this.http.get<Comment[]>(`/articles/${slug}/comments`, {});
  }
}
