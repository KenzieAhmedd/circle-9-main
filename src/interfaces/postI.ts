import type { UserI } from "./userI";
import type { CommentI } from "./commentI";

export interface postI {
  _id: string;
  body: string;
  image: string;
  privacy: "public";
  user: UserI;
  sharedPost: null;
  likes: unknown[];
  createdAt: string;
  commentsCount: number;
  topComment: CommentI | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}
