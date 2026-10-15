import axios from "axios";
import type {
  CreateCommentResponse,
  UpdateCommentResponse,
  DeleteCommentResponse,
  GetCommentsResponse,
} from "../types/response";

class CommentsService {
  async createComment(
    postId: string,
    formData: FormData,
  ): Promise<CreateCommentResponse> {
    const { data } = await axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      { headers: { token: localStorage.getItem("token") } },
    );
    return data;
  }

  async updateComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ): Promise<UpdateCommentResponse> {
    // VERIFY: your old URL was garbled; this matches the delete URL pattern
    const { data } = await axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      formData,
      { headers: { token: localStorage.getItem("token") } },
    );
    return data;
  }

  async deleteComment(
    postId: string,
    commentId: string,
  ): Promise<DeleteCommentResponse> {
    const { data } = await axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      { headers: { token: localStorage.getItem("token") } },
    );
    return data;
  }

  async getPostComments(postId: string): Promise<GetCommentsResponse> {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      { headers: { token: localStorage.getItem("token") } },
    );
    return data;
  }
}

const commentsService = new CommentsService();
export default commentsService;
