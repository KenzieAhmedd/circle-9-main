import { useContext, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Input } from "@heroui/react";
import { Trash } from "lucide-react";
import type { postI } from "../interfaces/postI";
import Comment from "./Comment";
import LoadingScreen from "./LoadingScreen";
import { authContext } from "../contexts/authContext";

export default function Post({
  post,
  deletePost,
  createComment,
  deleteComment,
  updateComment,
}: {
  post: postI;
  deletePost: (postId: string) => Promise<unknown>;
  createComment: (postId: string, formData: FormData) => Promise<unknown>;
  deleteComment: (postId: string, commentId: string) => Promise<unknown>;
  updateComment: (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => Promise<unknown>;
}) {
  const { userData } = useContext(authContext);

  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.set("content", commentContent);
      await createComment(post._id, formData);
      setCommentContent("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!post) {
    return <LoadingScreen />;
  }

  const isOwner = post.user?._id === userData?._id;

  return (
    <div className="bg-content1 rounded-xl shadow-sm p-4 mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="sm" name={post.user?.name} src={post.user?.photo} />
          <div>
            <p className="font-semibold text-sm">{post.user?.name}</p>
            <Link
              to={`/posts/${post._id}`}
              className="text-xs text-default-500 hover:underline"
            >
              {new Date(post.createdAt).toLocaleDateString()}
            </Link>
          </div>
        </div>

        {isOwner && (
          <button
            type="button"
            aria-label="Delete post"
            onClick={() => deletePost(post._id)}
          >
            <Trash size={18} className="text-red-500 cursor-pointer" />
          </button>
        )}
      </div>

      {/* Post Body */}
      {post.body && <p className="mt-4">{post.body}</p>}

      {post.image && (
        <img src={post.image} className="w-full object-cover mt-2" alt="" />
      )}

      {/* Post Footer */}
      <p className="text-xs text-default-500 mt-3">
        {post.likesCount} likes · {post.commentsCount} comments
      </p>

      <form
        className="flex gap-2 border-t pt-4 mt-3 border-divider"
        onSubmit={handleCreateComment}
      >
        <Input
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="comment...."
        />
        <Button
          isDisabled={commentContent.trim().length < 2}
          type="submit"
          isLoading={isLoading}
          color="primary"
        >
          Comment
        </Button>
      </form>

      {post.topComment && (
        <Comment
          comment={post.topComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        />
      )}
    </div>
  );
}
