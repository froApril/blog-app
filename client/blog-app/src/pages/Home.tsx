import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import usePosts, { Post } from "../hooks/usePost";

const Home = () => {
  const cat = useLocation().search.split("=")[1];
  const { data } = usePosts(cat ? cat : "");

  return (
    <>
      <div className="home">
        <div className="posts">
          {data.map((post: Post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
