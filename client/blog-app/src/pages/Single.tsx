import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Edit from "../assets/img/edit.png";
import Delete from "../assets/img/delete.png";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";

export interface SinglePost {
  _id: string;
  title: string;
  desc: string;
  img: string;
  userImg: string;
  username: string;
  date: string;
  cat: string;
}

const Single = () => {
  const [post, setPost] = useState<SinglePost | null>(null);
  const [currentUser, setCurrentUser] = useState<String | null>(null);
  const navigate = useNavigate();
  const parms = useParams();
  const targetId = parms.id!;

  useEffect(() => {
    // get post data with the given id
    if (sessionStorage.getItem("user") != null) {
      setCurrentUser(JSON.parse(sessionStorage.getItem("user")!).username);
    }
    axios.get("/api/post/all").then((res) => {
      if (res.status === 200) {
        setPost(
          res.data.find((post: SinglePost) => {
            return post._id === targetId;
          })
        );
      }
    });
  }, []);

  const handleDelete = () => {
    axios
      .delete("/api/post/" + targetId)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

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

export default Single;
