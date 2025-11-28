import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { JwtService } from './jwt.service';
import { User, LoginRequest, RegisterRequest } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user = signal<User | null>(null);
  isAuthenticated = computed(() => !!this.user());

  constructor(
    private readonly http: HttpService,
    private readonly jwtService: JwtService,
    private readonly router: Router
  ) {}

  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.http.get<User>(
        '/user',
        {},
        {
          headers: {
            Authorization: `Bearer ${this.jwtService.getToken()}`,
          },
        }
      );
      this.user.set(response.data);
      return response.data;
    } catch (error) {
      this.purgeAuth();
      return Promise.reject(error);
    }
  }

  async login(credentials: LoginRequest): Promise<User> {
    const response = await this.http.post<User>('/user/login', credentials);
    this.setAuth(response.data);
    return response.data;
  }

  async register(credentials: RegisterRequest): Promise<User> {
    const response = await this.http.post<User>('/user', credentials);
    this.setAuth(response.data);
    return response.data;
  }

  logout(): void {
    this.purgeAuth();
    this.router.navigateByUrl('/registers');
  }

  setAuth(user: User): void {
    this.jwtService.saveToken(user.token ?? 'test');
    this.user.set(user);
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.user.set(null);
  }

  async updateUser(user: Partial<User>): Promise<User> {
    try {
      const res = await this.http.put<User>('/user', { ...user });
      this.user.set(res.data);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
