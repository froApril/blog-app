import { Post } from "../hooks/usePost";
import moment from "moment";
import { Link } from "react-router-dom";
import Edit from "../assets/img/edit.png";
import Delete from "../assets/img/delete.png";
import DOMPurify from "dompurify";
import Menu from "./Menu";

interface Props {
  post: Post;
  currentUser: string | null;
  handleDelete: () => void;
  targetId: string;
}
const Article = ({ post, currentUser, handleDelete, targetId }: Props) => {
  return (
    <div className="single">
      <div className="content">
        {post != null && (
          <>
            <img src={post?.img} alt="" />
            <div className="user">
              {post.userImg && <img src={post.userImg} alt="" />}
              <div className="info">
                <span>{post.username}</span>
                <p style={{ margin: 0 }}>
                  Posted {moment(post.date).subtract(10, "days").calendar()}
                </p>
              </div>
              {currentUser && currentUser === post.username && (
                <div className="edit">
                  <Link to={"/write"} state={post}>
                    <img src={Edit} alt="" />
                  </Link>
                  <img onClick={handleDelete} src={Delete} alt="" />
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></p>{" "}
          </>
        )}
      </div>
      {post != null && <Menu cat={post.cat} parentId={targetId} />}
    </div>
  );
};

export default Article;
