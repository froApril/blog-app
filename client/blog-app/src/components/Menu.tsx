import { useEffect, useState } from "react";
import { Post } from "../pages/Home";
import axios from "axios";
import { SinglePost } from "../pages/Single";

interface Props {
  cat: string;
  parentId: string;
}

const Menu = ({ cat, parentId }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let url = "/api/post/";
    url += cat;
    axios.get(url).then((res) => {
      setPosts(res.data.filter((post: SinglePost) => post._id != parentId));
    });
  }, []);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <img src={post?.img} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
