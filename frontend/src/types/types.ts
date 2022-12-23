export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstname: string | null;
  lastname: string | null;
};

export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  author: string;
  poemRequest: string;
  poetInspiration: string;
  poemStyle: string;
  likeCount: number;
};

export type Posts = {
  items: Post[];
  nextCursor: string | null;
};
