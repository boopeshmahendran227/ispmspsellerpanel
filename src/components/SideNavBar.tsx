import Link from "./Link";
import CSSConstants from "../constants/CSSConstants";
import Chroma from "chroma-js";

const SideNavBar = () => {
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
            <Link
              activeClassName="active"
              href="/order"
              matchFunc={(path) => path.includes("/order")}
            >
              <a>
                <i className="fas fa-shopping-cart" aria-hidden={true}></i>
                <span>Orders</span>
              </a>
            </Link>
          </li>
          <li>
            <Link
              activeClassName="active"
              href="/quote"
              matchFunc={(path) => path.includes("/quote")}
            >
              <a>
                <i className="fas fa-clipboard-list" aria-hidden="true"></i>
                <span>Quotes</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/visit">
              <a>
                <i className="fas fa-calendar-alt"></i>
                <span>Showroom Visits</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/testdrive">
              <a>
                <i className="fa fa-motorcycle" aria-hidden="true"></i>
                <span>Booked Test Rides</span>
              </a>
            </Link>
          </li>
          <li>
            <Link
              activeClassName="active"
              href="/product"
              matchFunc={(path) => path.includes("/product")}
            >
              <a>
                <i className="fas fa-warehouse" aria-hidden={true}></i>
                <span>Products</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/draft">
              <a>
                <i className="fas fa-pen-square" aria-hidden={true}></i>
                <span>Product Drafts</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/customers">
              <a>
                <i className="fas fa-users" aria-hidden="true"></i>
                <span>Customers</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/customers">
              <a>
                <i className="fas fa-cog" aria-hidden="true"></i>
                <span>Settings</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          nav {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${CSSConstants.primaryColor};
            color: white;
            box-shadow: 0 3px 6px #00000029;
          }
          .logoContainer {
            margin: 0.8em;
            font-size: 1.5rem;
          }
          .logoContainer a {
            padding: 0.8em 0;
          }
          .navigation {
            width: 100%;
          }
          .navigation ul {
            list-style: none;
            display: flex;
            width: 100%;
            padding: 0;
            flex-direction: column;
          }
          a {
            display: inline-block;
            width: 100%;
            padding: 1em;
            transition: all 0.3s;
            text-decoration: none;
          }
          a i {
            width: 1.3rem;
            margin: 0.3em;
          }
          .navigation a.active {
            background: ${CSSConstants.lightPrimaryColor};
            border-left: 2px solid white;
          }
          .navigation a:hover {
            background: ${Chroma(CSSConstants.primaryColor)
              .brighten(0.4)
              .css()};
          }
        `}
      </style>
    </nav>
  );
};

export default SideNavBar;
