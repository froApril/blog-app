import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../assets/img/edit.png";
import Delete from "../assets/img/delete.png";
import Menu from "../components/Menu";

interface SinglePost {
  id: number;
  title: string;
  desc: string;
  img: string;
  userImg: string;
  username: string;
  date: string;
  cat: string;
}

const Single = () => {
  const postData = {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    userImg:
      "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    username: "username",
    date: "27/1/2024",
    cat: "art",
  };

  const [post, setPost] = useState<SinglePost | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // get post data with the given id
    const postId = location.pathname.split("/")[2];
    console.log("postId is: " + postId);
    setPost(postData);
  }, []);

  const currentUser = {
    username: "username",
  };

  const handleDelete = () => {
    console.log("Trying to delete this post");
    navigate("/");
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
                <p style={{ margin: 0 }}>Posted {post.date}</p>
              </div>
              {currentUser.username === post.username && (
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
      {post != null && <Menu cat={post.cat} />}
    </div>
  );
};

export default Single;
