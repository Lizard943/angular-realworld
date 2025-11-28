import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-input',
  template: `<div class="tag-box" (click)="inputField.focus()">
    <input
      #inputField
      [(ngModel)]="inputValue"
      (keydown)="onKeyDown($event)"
      (blur)="addTagFromInput()"
      placeholder="Enter tags"
      class="form-control"
    />
    <div class="tag-list">
      <ng-container *ngFor="let t of tags; let i = index">
        <span class="tag-default tag-pill">
          <i class="ion-close-round"></i>{{ t }}
          <span class="remove" (click)="removeTag(i)">×</span>
        </span>
      </ng-container>
    </div>
  </div> `,
  imports: [FormsModule, NgFor],
})
export class TagInputComponent {
  @Input() tags: string[] = [];
  @Output() tagsChange = new EventEmitter<string[]>();

  inputValue = '';

  addTagFromInput() {
    const raw = this.inputValue.trim();
    if (!raw) return;

    const parts = raw
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t !== '');
    parts.forEach((tag) => {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    });

    this.tagsChange.emit(this.tags);
    this.inputValue = '';
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTagFromInput();
    }

    if (event.key === 'Backspace' && this.inputValue === '') {
      this.tags.pop();
      this.tagsChange.emit(this.tags);
    }
  }

  removeTag(i: number) {
    this.tags.splice(i, 1);
    this.tagsChange.emit(this.tags);
  }
}
