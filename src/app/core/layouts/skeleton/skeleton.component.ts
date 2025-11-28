import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  template: `
    <div class="skeleton">
      <div class="skeleton-header"></div>
      <div class="skeleton-body"></div>
    </div>
  `,
  styleUrls: ['./skeleton.component.css'],
})
export class SkeletonComponent {}
