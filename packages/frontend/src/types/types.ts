export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstname: string | null;
  lastname: string | null;
  googleId: string | null;
  pictureUrl: string | null;
  favoritePosts: string[];
};

export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string | null;
  content: string;
  imageUrl: string | null;
  published: boolean;
  author: string;
  poemRequest: string;
  poetInspiration: string;
  poemStyle: string;
};

export type Posts = {
  items: Post[];
  nextCursor: string | null;
};
