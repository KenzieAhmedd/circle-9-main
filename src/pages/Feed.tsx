import { useQuery, useQueryClient } from "@tanstack/react-query";
import postsService from "../services/postsService";
import commentsService from "../services/commentsService";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

export default function Feed() {
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAllPosts,
    select: (response) => response.data.posts,
  });

  function refreshPosts() {
    return queryClient.invalidateQueries({ queryKey: ["posts"] });
  }

  async function deletePost(postId: string) {
    const response = await postsService.deletePost(postId);
    await refreshPosts();
    return response;
  }

  async function createComment(postId: string, formData: FormData) {
    const response = await commentsService.createComment(postId, formData);
    await refreshPosts();
    return response;
  }

  async function deleteComment(postId: string, commentId: string) {
    const response = await commentsService.deleteComment(postId, commentId);
    await refreshPosts();
    return response;
  }

  async function updateComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ) {
    const response = await commentsService.updateComment(
      postId,
      commentId,
      formData,
    );
    await refreshPosts();
    return response;
  }

  return (
    <div className="max-w-3xl my-10 mx-auto">
      <div className="grid gap-4">
        <CreatePost />

        {isLoading && <p className="text-center">Loading posts...</p>}

        {isError && (
          <p className="text-center text-danger">
            Couldn't load posts. Please try again.
          </p>
        )}

        {!isLoading && !isError && posts.length === 0 && (
          <p className="text-center text-default-500">No posts yet.</p>
        )}

        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            deletePost={deletePost}
            createComment={createComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
}
