import { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Button } from "@heroui/react";
import { authContext } from "../contexts/authContext";
import { counterContext } from "../contexts/counterContext";
import postsService from "../services/postsService";

export default function Profile() {
  const { userData } = useContext(authContext);
  const { count, setCount } = useContext(counterContext);

  const { data: myPosts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAllPosts,
    select: (response) =>
      response.data.posts.filter((post) => post.user._id === userData?._id),
  });

  return (
    <div className="max-w-3xl mx-auto grid gap-4">
      <div className="flex items-center gap-4 bg-content1 rounded-xl shadow-sm p-4">
        <Avatar size="lg" name={userData?.name} src={userData?.photo} />
        <div>
          <h1 className="text-2xl font-bold">{userData?.name}</h1>
          <p className="text-default-500">@{userData?.username}</p>
        </div>
      </div>

      <Button
        color="primary"
        variant="flat"
        onPress={() => setCount(count + 1)}
      >
        Counter: {count} (Increase)
      </Button>

      <h2 className="text-xl font-semibold">My posts</h2>

      {isLoading && <p>Loading...</p>}

      {!isLoading && myPosts.length === 0 && (
        <p className="text-default-500">You haven't posted anything yet.</p>
      )}

      {myPosts.map((post) => (
        <Link
          key={post._id}
          to={`/posts/${post._id}`}
          className="block bg-content1 rounded-xl shadow-sm p-4"
        >
          {post.body || "(image post)"}
        </Link>
      ))}
    </div>
  );
}
