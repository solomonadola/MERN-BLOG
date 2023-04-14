import { Link } from "react-router-dom";
import "./header.css";
import { User } from "./User";
// import logo from "../../assets/images/logo.png";
const Header = () => {
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    header.classList.toggle("active", this.window.scrollY > 100);
  });
  return (
    <>
      <header className="header">
        <div className="container flex">
          <div className="logo">
            <img src="{logo}" alt="logo" width="10px" />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </nav>
          <div className="account flexCenter">{<User />}</div>
        </div>
      </header>
      <section></section>
    </>
  );
};
export default Header;
