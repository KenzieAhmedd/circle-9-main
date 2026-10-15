import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { postI } from "../interfaces/postI";
import type { CommentI } from "../interfaces/commentI";
import postsService from "../services/postsService";
import commentsService from "../services/commentsService";
import Post from "../components/Post";
import Comment from "../components/Comment";
import LoadingScreen from "../components/LoadingScreen";

export default function PostDetails() {
  const { postId = "" } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<postI>();
  const [comments, setComments] = useState<CommentI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getPostDetails() {
    try {
      const response = await postsService.getPostDetails(postId);
      setPost(response.data.post);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getPostComments() {
    try {
      const response = await commentsService.getPostComments(postId);
      // VERIFY: console.log(response) to confirm comments are at response.data.comments
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  }

  function refresh() {
    return Promise.all([getPostDetails(), getPostComments()]);
  }

  useEffect(() => {
    refresh();
  }, [postId]);

  async function deletePost(id: string) {
    const response = await postsService.deletePost(id);
    navigate("/");
    return response;
  }

  async function createComment(id: string, formData: FormData) {
    const response = await commentsService.createComment(id, formData);
    await refresh();
    return response;
  }

  async function deleteComment(id: string, commentId: string) {
    const response = await commentsService.deleteComment(id, commentId);
    await refresh();
    return response;
  }

  async function updateComment(
    id: string,
    commentId: string,
    formData: FormData,
  ) {
    const response = await commentsService.updateComment(
      id,
      commentId,
      formData,
    );
    await refresh();
    return response;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!post) {
    return <p className="text-center mt-10">Post not found.</p>;
  }

  return (
    <div className="grid gap-4">
      {/* topComment is hidden here because the full list is shown below */}
      <Post
        post={{ ...post, topComment: null }}
        deletePost={deletePost}
        createComment={createComment}
        deleteComment={deleteComment}
        updateComment={updateComment}
      />

      <div className="bg-content1 rounded-xl shadow-sm p-4">
        <h2 className="font-semibold">Comments ({comments.length})</h2>

        {comments.length === 0 && (
          <p className="text-default-500 pt-2">No comments yet.</p>
        )}

        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            deleteComment={deleteComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
}
