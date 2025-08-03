import { Comment, Article, User } from "@/generated/prisma";
export type articles = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type singlearticle = Article & {
  comments: (Comment & { user: User })[];
};