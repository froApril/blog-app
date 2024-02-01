import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface Post {
  _id: string;
  title: string;
  desc: string;
  img: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const cat = useLocation().search.split("=")[1];
  const [fileDataUrl, setFileDataUrl] = useState(null);

  useEffect(() => {
    let url = "/api/post/";
    if (cat) url += cat;
    axios.get(url).then((res) => {
      // res.data.map((post: Post) => {
      //   post.img = reader.readAsDataURL(post.img);
      // });
      setPosts(res.data);
    });
  }, [cat]);

  return (
    <>
      <div className="home">
        <div className="posts">
          {posts.map((post) => (
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
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
