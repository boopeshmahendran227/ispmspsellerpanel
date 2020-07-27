import Link from "next/link";
import CSSConstants from "../constants/CSSConstants";
import Chroma from "chroma-js";
import SubMenu, { SubMenuItemInterface } from "./SubMenu";
import { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

interface MenuTreeItem {
  name: string;
  hasSubMenu?: boolean;
  subMenuItems?: SubMenuItemInterface[];
  href?: string;
  matchFunc?: (path: string) => boolean;
  icon: React.ReactNode;
}

const menuTree: MenuTreeItem[] = [
  {
    name: "Home",
    href: "/",
    icon: <i className="fas fa-home" aria-hidden={true}></i>,
  },
  {
    name: "Sales",
    hasSubMenu: true,
    matchFunc: (path) =>
      path.includes("/order") ||
      path.includes("customerinvoice") ||
      path.includes("/quote"),
    subMenuItems: [
      {
        name: "Order",
        href: "/order",
      },
      {
        name: "Quotes",
        href: "/quote",
      },
      {
        name: "Invoices",
        href: "/customerinvoice",
      },
    ],
    icon: <i className="fas fa-shopping-cart" aria-hidden={true}></i>,
  },
  {
    name: "Catalog",
    hasSubMenu: true,
    subMenuItems: [
      {
        name: "Products",
        href: "/product",
      },
      {
        name: "Drafts",
        href: "/draft",
      },
    ],
    matchFunc: (path) => path.includes("/product") || path.includes("/draft"),
    icon: <i className="fas fa-warehouse" aria-hidden={true}></i>,
  },
  {
    name: "Customers",
    href: "/customer",
    icon: <i className="fas fa-users" aria-hidden="true"></i>,
    matchFunc: (path) => path.includes("/customer"),
  },
  {
    name: "Discounts",
    hasSubMenu: true,
    subMenuItems: [
      {
        name: "Coupons",
        href: "/coupon",
      },
    ],
    icon: <i className="fas fa-tag"></i>,
    matchFunc: (path) => path.includes("/coupon"),
  },
  {
    name: "Insights",
    href: "/insights",
    icon: <i className="fas fa-chart-line"></i>,
    matchFunc: (path) => path.includes("/insights"),
  },
  {
    name: "Others",
    hasSubMenu: true,
    subMenuItems: [
      {
        name: "Showroom Visits",
        href: "/visit",
      },
      {
        name: "Test Rides",
        href: "/testdrive",
      },
    ],
    icon: <i className="fa fa-ellipsis-h" aria-hidden="true"></i>,
    matchFunc: (path) => path.includes("/visit") || path.includes("/testdrive"),
  },
];

const SideNavBar = () => {
  const [currentOpenIndex, setCurrentOpenIndex] = useState(null);
  const router = useRouter();
  const activePath = router.pathname;

  const getCurrentActiveIndex = () => {
    if (currentOpenIndex !== null) {
      return currentOpenIndex;
    }

    const currentActiveIndex = menuTree.findIndex(
      (item) => item.matchFunc && item.matchFunc(activePath)
    );

    if (currentActiveIndex !== -1) {
      return currentActiveIndex;
    }

    return 0;
  };

  const activeIndex = getCurrentActiveIndex();

  return (
    <nav>
      <div className="navigation">
        <ul>
          {menuTree.map((item, index) => (
            <li key={index}>
              {item.hasSubMenu ? (
                <a
                  className={classNames({ active: index === activeIndex })}
                  onClick={() =>
                    setCurrentOpenIndex(
                      currentOpenIndex !== index ? index : null
                    )
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link href={item.href} key={index}>
                  <a
                    className={classNames({ active: index === activeIndex })}
                    onClick={() => setCurrentOpenIndex(null)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {menuTree.map(
        (item, index) =>
          item.hasSubMenu && (
            <SubMenu
              key={index}
              header={item.name}
              open={currentOpenIndex === index}
              items={item.subMenuItems}
              onClose={() => setCurrentOpenIndex(null)}
            />
          )
      )}
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
            padding: 0.9em 0.5em;
            transition: all 0.3s;
            text-decoration: none;
            font-size: 0.9rem;
          }
          a :global(i) {
            font-size: 1.3rem;
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
