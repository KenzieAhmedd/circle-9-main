import type { postI } from "../interfaces/postI";
import type { CommentI } from "../interfaces/commentI";

export type Response<DataI> = {
  success: boolean;
  message: string;
  data: DataI;
};

export type GetPostsResponse = Response<{ posts: postI[] }> & {
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      nextPage: number;
      numberOfPages: number;
      total: number;
    };
  };
};

export type GetPostResponse = Response<{ post: postI }>;
export type GetCommentsResponse = Response<{ comments: CommentI[] }>;
export type CreateCommentResponse = Response<{ comment: CommentI }>;
export type UpdateCommentResponse = CreateCommentResponse;
export type DeleteCommentResponse = Response<{}>;
