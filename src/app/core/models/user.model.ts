export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  image: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
