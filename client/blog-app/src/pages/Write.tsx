import { useState } from "react";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import axios from "axios";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [postId, setPostId] = useState(state?._id || "");
  const [file, setFile] = useState<File | null>(null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();

  const publish = async () => {
    let img =
      "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    if (file) {
      img = (await toBase64(file)) as string;
    }
    const post = {
      title: title,
      userImg: img,
      img: img,
      date: moment().format("YYYY-MM-DD"),
      cat: cat,
      desc: value,
      username: JSON.parse(sessionStorage.getItem("user")!).username, // make current username as a context
    };
    // make the axios part to be hooks
    if (postId != "") {
      axios
        .put("/api/post/" + postId, post)
        .then((res) => {
          if (res.status === 200) {
            alert(res.data);
            navigate("/");
          } else {
            alert(res.data);
          }
        })
        .catch((err) => alert(err.response.data));
    } else {
      axios
        .post("/api/post", post)
        .then((res) => {
          if (res.status === 200) {
            alert("Create post success");
            navigate("/");
          } else {
            alert(res.data);
          }
        })
        .catch((err) => alert(err.response.data));
    }
  };

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(resolve(reader.result));
      reader.onerror = (error) => reject(error);
    });

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => {
              if (e.target.files != null) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          {file && <label className="file">{file.name}</label>}
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={publish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
