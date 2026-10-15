import { useContext, useState, type FormEvent } from "react";
import { Button, Input } from "@heroui/react";
import { Pencil, Trash } from "lucide-react";
import type { CommentI } from "../interfaces/commentI";
import { authContext } from "../contexts/authContext";

export default function Comment({
  comment,
  deleteComment,
  updateComment,
}: {
  comment: CommentI;
  deleteComment: (postId: string, commentId: string) => Promise<unknown>;
  updateComment: (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => Promise<unknown>;
}) {
  const { userData } = useContext(authContext);
  const [editMode, setEditMode] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = comment.commentCreator?._id === userData?._id;

  async function handleEditComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.set("content", commentContent);
      await updateComment(comment.post, comment._id, formData);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function cancelEdit() {
    setCommentContent(comment.content);
    setEditMode(false);
  }

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm">{comment.commentCreator?.name}</p>

        {isOwner && (
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Edit comment"
              onClick={() => setEditMode(true)}
            >
              <Pencil size={18} className="text-yellow-500 cursor-pointer" />
            </button>
            <button
              type="button"
              aria-label="Delete comment"
              onClick={() => deleteComment(comment.post, comment._id)}
            >
              <Trash size={18} className="text-red-500 cursor-pointer" />
            </button>
          </div>
        )}
      </div>

      {!editMode ? (
        <p className="pt-2">{comment.content}</p>
      ) : (
        <form onSubmit={handleEditComment} className="pt-2 flex flex-col gap-2">
          <Input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="comment...."
          />
          <div className="flex gap-2 justify-end">
            <Button type="button" color="default" onPress={cancelEdit}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={commentContent.trim().length < 2}
            >
              Edit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
