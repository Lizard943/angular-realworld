import { Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { ArticlesResolver } from './features/articles/components/article.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/articles/pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'editor',
    loadComponent: () =>
      import('./features/articles/pages/editor/editor.component').then((m) => m.EditorComponent),
  },
  {
    path: 'article/:slug',
    loadComponent: () =>
      import('./features/articles/pages/article/article.component').then(
        (m) => m.ArticlesComponent
      ),
    resolve: { article: ArticlesResolver },
  },
  {
    path: 'profile/:username',
    loadComponent: () =>
      import('./features/profile/page/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/setting/setting.component').then((m) => m.SettingComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
