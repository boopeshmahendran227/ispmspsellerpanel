import Link from "./Link";
import CSSConstants from "../constants/CSSConstants";

const Navbar = () => {
  return (
    <nav>
      <div className="logoContainer">
        <Link href="/">
          <a>Istakapaza Sellers</a>
        </Link>
      </div>
      <div className="navigation">
        <ul>
          <li>
            <Link activeClassName="active" href="/">
              <a>
                <i className="fas fa-home" aria-hidden={true}></i>
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/">
              <a>
                <span>Catalog</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/order">
              <a>
                <i className="fas fa-shopping-cart" aria-hidden={true}></i>
                <span>Orders</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/quote">
              <a>
                <i className="fas fa-clipboard-list" aria-hidden="true"></i>
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
            font-size: 1.3rem;
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
            background: ${CSSConstants.primaryColor};
            color: white;
            box-shadow: 0 3px 6px #00000029;
            flex-wrap: wrap;
          }
          a {
            display: inline-block;
            padding: 1em;
            transition: all 0.3s;
          }
          a i {
            margin: 0.3em;
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
