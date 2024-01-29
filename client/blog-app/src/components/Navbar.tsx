import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
const Navbar = () => {
  const context = useContext(AuthContext);
  const currentUser = context?.currentUser;
  let username = "";
  if (currentUser) username = JSON.stringify(currentUser);
  username = username.slice(1, username.length - 1);
  const logout = context?.logout;

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
          {currentUser ? (
            <>
              <span>{username}</span>
              <span onClick={logout}>Logout</span>
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
