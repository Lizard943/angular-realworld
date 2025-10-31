import { computed, Injectable, signal } from '@angular/core';
import { HttpService } from './http.service';
import { JwtService } from './jwt.service';
import { User, LoginRequest } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user = signal<User | null>(null);
  isAuthenticated = computed(() => !!this.user());

  constructor(private readonly http: HttpService, private readonly jwtService: JwtService) {}

  async login(credentials: LoginRequest): Promise<User> {
    const response = await this.http.post<User>('/user/login', credentials);
    await this.setAuth(response.data);
    return response.data;
  }

  async setAuth(user: User): Promise<void> {
    this.jwtService.saveToken(user.token ?? '');
    this.user.set(user);
  }
}
