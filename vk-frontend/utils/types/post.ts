export type PostT = {
  id: number;
  content: string;
  attachments: String[];
  like: User[];
  date: Date;
  author: User;
};

export type CreatePostT = {
  content: string;
  attachments: String[];
};

export interface User {
  id: number;
  avatar_url?: string;
  name: string;
  dob: string;
  edu?: string;
  city: string;
  posts: PostT[];
  friends: User[];
}
