import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TagInputComponent } from '../../components/tag-input.component';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../../core/auth/services/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  imports: [TagInputComponent, CommonModule, ReactiveFormsModule],
})
export class EditorComponent {
  constructor(private articleService: ArticleService) {}
  articleForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    tagList: new FormControl<string[]>([]),
  });
  error = signal<boolean>(false);
  onTagsChange(tags: string[]) {
    this.articleForm.get('tagList')?.setValue(tags);
  }

  onSubmit() {
    this.error.set(false);
    this.articleService
      .createArticle(this.articleForm.value)
      .then((response) => {
        console.log('Article created:', response.data.article);
      })
      .catch(() => {
        this.error.set(true);
      });
  }
}
