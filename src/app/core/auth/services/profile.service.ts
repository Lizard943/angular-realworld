import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Profile } from '../../models/article.model';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpService) {}

  getProfile<Profile>(username: string) {
    return this.http.get<Profile>(`/profiles/${username}`, {});
  }

  followUser(username: string) {
    return this.http.post<any>(`/profiles/${username}/follow`, {});
  }

  unfollowUser(username: string) {
    return this.http.delete<any>(`/profiles/${username}/follow`, {});
  }
}
