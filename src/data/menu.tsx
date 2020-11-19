import { SubMenuItemInterface } from "components/template/SubMenu";

interface NoSubmenuMenuItem {
  name: string;
  hasSubMenu?: false;
  href: string;
  matchFunc?: (path: string) => boolean;
  icon: React.ReactNode;
}

interface SubmenuMenuItem {
  name: string;
  hasSubMenu: true;
  matchFunc?: (path: string) => boolean;
  icon: React.ReactNode;
  subMenuItems: SubMenuItemInterface[];
}
type MenuTreeItem = SubmenuMenuItem | NoSubmenuMenuItem;
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
    name: "Settings",
    href: "/settings",
    icon: <i className="fas fa-cog"></i>,
    matchFunc: (path) => path.includes("/settings"),
  },
  {
    name: "Marketing",
    hasSubMenu: true,
    subMenuItems: [
      {
        name: "Send SMS",
        href: "/bulkSms",
      },
    ],
    icon: <i className="fas fa-bullhorn" aria-hidden="true"></i>,
    matchFunc: (path) => path.includes("/bulkSms"),
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
export default menuTree;
