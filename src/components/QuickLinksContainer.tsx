import Link from "next/link";
import CSSConstants from "../constants/CSSConstants";
import RoundedIcon from "./atoms/RoundedIcon";

interface LinkInterface {
  icon: React.ReactNode;
  linkText: string;
  href: string;
}

const links: LinkInterface[] = [
  {
    icon: <RoundedIcon icon={<i className="fa fa-plus" />} color={"#e53935"} />,
    linkText: "Add Product",
    href: "/product/new",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fas fa-warehouse" />}
        color={"#8E24AA"}
      />
    ),
    linkText: "My Products",
    href: "/product",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fa fa-history" aria-hidden="true" />}
        color={"#039BE5"}
      />
    ),
    linkText: "Recent Orders",
    href: "/#recentOrders",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fa fa-shopping-cart" aria-hidden="true"></i>}
        color={"#43A047"}
      />
    ),
    linkText: "All Orders",
    href: "/order",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fas fa-file-invoice"></i>}
        color={"#FFB300"}
      />
    ),
    linkText: "Invoices",
    href: "/customerinvoice",
  },
  {
    icon: (
      <RoundedIcon
        icon={<i className="fas fa-clipboard-list"></i>}
        color={"#3949AB"}
      />
    ),
    linkText: "Quotes",
    href: "/quote",
  },
  {
    icon: (
      <RoundedIcon icon={<i className="fas fa-users"></i>} color={"#00897B"} />
    ),
    linkText: "Customers",
    href: "/customer",
  },
  {
    icon: (
      <RoundedIcon icon={<i className="fas fa-cog"></i>} color={"#F4511E"} />
    ),
    linkText: "Settings",
    href: "/settings",
  },
];

interface IconLinkProps {
  link: LinkInterface;
}

const IconLink = (props: IconLinkProps): JSX.Element => {
  const { link } = props;

  return (
    <Link href={link.href}>
      <div className="flexContainer">
        <div className="iconContainer">{link.icon}</div>
        <div className="contentContainer">{link.linkText}</div>
        <style jsx>{`
          .flexContainer {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            text-align: center;
            margin: 0.5em 1.6em;
            width: 120px;
          }
          .contentContainer {
            margin-top: 0.5em;
            font-size: 1.2rem;
            color: ${CSSConstants.secondaryTextColor};
          }
          .flexContainer:hover .contentContainer {
            color: ${CSSConstants.secondaryColor};
            text-decoration: underline;
          }
        `}</style>
      </div>
    </Link>
  );
};

const QuickLinksContainer = (): JSX.Element => {
  return (
    <div className="card">
      <div className="header">Quick Links</div>
      <div className="body">
        {links.map((link) => (
          <IconLink link={link} />
        ))}
      </div>
      <style jsx>{`
        .card {
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          width: 100%;
          border-radius: 1em;
          margin-top: 1.5em;
        }
        .header {
          padding: 0.8em 1.1em;
          font-size: 1.5rem;
          font-weight: bold;
          border-bottom: 1px solid #f0f0f0;
        }
        .body {
          margin-top: 1.5em;
          padding-bottom: 1em;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default QuickLinksContainer;
