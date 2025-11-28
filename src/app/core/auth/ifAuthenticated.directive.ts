import { Directive, OnInit, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { UserService } from './services/user.service';
import { Input } from '@angular/core';

@Directive({
  selector: '[ifAuthenticated]',
  standalone: true,
})
export class IfAuthenticatedDirective<T> implements OnInit {
  @Input() ifAuthenticated = true;
  constructor(
    private readonly userService: UserService,
    private readonly templateRef: TemplateRef<T>,
    private readonly viewContainer: ViewContainerRef
  ) {
    effect(() => {
      const isAuthenticated = this.userService.isAuthenticated();
      if (isAuthenticated === this.ifAuthenticated) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnInit(): void {}
}
