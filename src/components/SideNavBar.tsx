import Link from "./Link";
import CSSConstants from "../constants/CSSConstants";
import Chroma from "chroma-js";

const SideNavBar = () => {
  return (
    <nav>
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
            <Link activeClassName="active" href="/insights">
              <a>
                <i className="fas fa-chart-line"></i>
                <span>Insights</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/customerinvoice">
              <a>
                <i className="fas fa-file"></i>
                <span>Invoice</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/visit">
              <a>
                <i className="fas fa-calendar-alt"></i>
                <span>Visits</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/testdrive">
              <a>
                <i className="fa fa-motorcycle" aria-hidden="true"></i>
                <span>Test Rides</span>
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
            <Link
              activeClassName="active"
              href="/draft"
              matchFunc={(path) => path.includes("/draft")}
            >
              <a>
                <i className="fas fa-pen-square" aria-hidden={true}></i>
                <span>Drafts</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/customer">
              <a>
                <i className="fas fa-users" aria-hidden="true"></i>
                <span>Customers</span>
              </a>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" href="/coupon">
              <a>
                <i className="fas fa-tag"></i>
                <span>Coupons</span>
              </a>
            </Link>
          </li>
          {/* <li>
            <Link activeClassName="active" href="/customers">
              <a>
                <i className="fas fa-cog" aria-hidden="true"></i>
                <span>Settings</span>
              </a>
            </Link>
          </li> */}
        </ul>
      </div>
      <style jsx>
        {`
          nav {
            position: absolute;
            top: 60px;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${CSSConstants.primaryColor};
            color: white;
            box-shadow: 0 3px 6px #00000029;
            animation: dragIn ease-in-out 0.5s;
          }
          .navigation {
            width: 100%;
          }
          .navigation ul {
            list-style: none;
            display: flex;
            width: 100%;
            padding: 0;
            margin: 0;
            flex-direction: column;
          }
          a {
            display: flex;
            flex-direction: column;
            text-align: center;
            width: 100%;
            padding: 0.5em 0.5em;
            transition: all 0.3s;
            text-decoration: none;
            font-size: 0.9rem;
          }
          a i {
            font-size: 1.4rem;
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
          @keyframes dragIn {
            0% {
              transform: translateX(-100px);
            }
            100% {
              transform: translateX(0px);
            }
          }
        `}
      </style>
    </nav>
  );
};

export default SideNavBar;