import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useContext, useEffect, useState } from "react";

interface User {
  _id?: string;
  username: string;
  password: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem("user")!));
  }, [sessionStorage.getItem("user")]);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {currentUser != null ? (
            <>
              <span>{currentUser.username}</span>
              <span
                onClick={() => {
                  setCurrentUser(null);
                  navigate("/");
                }}
              >
                Logout
              </span>
              <span className="write">
                <Link className="link" to="/write">
                  Write
                </Link>
              </span>
            </>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
