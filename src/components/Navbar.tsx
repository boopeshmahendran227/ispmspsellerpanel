import Link from "./Link";
import CSSConstants from "../constants/CSSConstants";

const Navbar = () => {
  return (
    <nav>
      <div className="logoContainer">
        <Link href="/">
          <a>Istakapaza</a>
        </Link>
      </div>
      <div className="navigation">
        <ul>
          <li>
            <Link activeClassName="active" href="/">
              <a>
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/order">
              <a>
                <span>Orders</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/quote">
              <a>
                <span>Quotes</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          .logoContainer {
            display: flex;
            align-items: center;
            margin: 0 1.5em;
          }
          .logoContainer a {
            padding: 1em 0;
          }
          .logo {
            height: 1.8rem;
          }
          .navigation ul {
            list-style: none;
            display: flex;
            margin: 0;
            flex-wrap: wrap;
          }
          .navigation {
            margin: auto;
          }
          .navigation li {
            margin: 0 0.3em;
          }
          nav {
            display: flex;
            align-items: center;
            //background: linear-gradient(90deg, #7436FF, #1967FF);
            background: ${CSSConstants.primaryColor};
            color: white;
            box-shadow: 0 3px 6px #00000029;
            flex-wrap: wrap;
          }
          a {
            display: inline-flex;
            align-items: center;
            position: relative;
          }
          a span {
            display: inline-block;
            padding: 1.3em 0.6em 1.3em 2.3em;
          }
          .icon {
            position: absolute;
            left: 0.5em;
            top: 50%;
            transform: translateY(-50%);
          }
          .hoverIcon {
            opacity: 0;
            transition: all 0.3s;
          }
          a.active .hoverIcon {
            opacity: 1;
          }
          a.active {
            background: white;
            color: ${CSSConstants.primaryColor};
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
