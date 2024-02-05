import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import usePosts, { Post } from "../hooks/usePost";
import Article from "../components/Article";

const Single = () => {
  const { data, error } = usePosts("");
  if (error) return;
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const parms = useParams();
  const targetId = parms.id!;
  const targetPost = data.find((post: Post) => post._id === targetId)!;

  useEffect(() => {
    // get post data with the given id
    if (sessionStorage.getItem("user") != null) {
      setCurrentUser(JSON.parse(sessionStorage.getItem("user")!).username);
    }
    console.log(targetPost);
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
    <>
      {data.map((post: Post) => {
        if (post._id === targetId) {
          return (
            <Article
              post={post}
              currentUser={currentUser}
              handleDelete={handleDelete}
              targetId={targetId}
            />
          );
        }
      })}
    </>
  );
};

export default Single;
