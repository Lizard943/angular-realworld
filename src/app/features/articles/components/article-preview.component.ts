import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/article.model';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-article-preview',
  imports: [NgFor, DatePipe],
  template: `
    <div class="article-preview">
      <div class="article-meta">
        <a [href]="'/profile/' + article!.author.username"
          ><img src="http://i.imgur.com/Qr71crq.jpg"
        /></a>
        <div class="info">
          <a [href]="'/profile/' + article!.author.username" class="author">{{
            article!.author.username
          }}</a>
          <span class="date">{{ article!.createdAt | date : 'longDate' }}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
          <i class="ion-heart"></i> {{ 0 }}
        </button>
      </div>
      <a href="/article/{{ article!.slug }}" class="preview-link">
        <h1>{{ article!.title }}</h1>
        <p>{{ article!.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <ng-container *ngFor="let tag of article!.tagList">
            <li class="tag-default tag-pill tag-outline">{{ tag }}</li>
          </ng-container>
        </ul>
      </a>
    </div>
  `,
})
export class ArticlePreviewComponent {
  @Input() article: Article | null = null;
}
