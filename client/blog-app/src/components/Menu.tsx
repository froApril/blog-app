import PostCard from "./PostCard";
import usePosts, { Post } from "../hooks/usePost";

interface Props {
  cat: string;
  parentId: string;
}

const Menu = ({ cat, parentId }: Props) => {
  const { data, error } = usePosts(cat);

  if (error) return null;

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {data
        .filter((post: Post) => post._id != parentId)
        .map((post: Post) => (
          <PostCard post={post} />
        ))}
    </div>
  );
};

export default Menu;
