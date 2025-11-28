export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  author: Profile;
  // favorited: boolean;
  // favoritesCount: number;
}

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

export interface Profile {
  id?: string;
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
