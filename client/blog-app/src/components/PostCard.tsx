import { Link } from "react-router-dom";
import { Post } from "../hooks/usePost";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <div className="post" key={post._id}>
      <div className="img">
        <img src={post.img} alt="" />
      </div>
      <div className="content">
        <Link className="link" to={`/post/${post._id}`}>
          <h1>{post.title}</h1>
        </Link>
        <div dangerouslySetInnerHTML={{ __html: post.desc }} />
        <button>Read More</button>
      </div>
    </div>
  );
};

export default PostCard;
