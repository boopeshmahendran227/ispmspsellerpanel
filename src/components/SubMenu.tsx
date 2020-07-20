import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";
import Chroma from "chroma-js";

// images
import CloseIcon from "../../public/icons/close.svg";
import Link from "next/link";

export interface SubMenuItemInterface {
  name: string;
  href: string;
}

interface SubMenuProps {
  header: string;
  open: boolean;
  onClose: () => void;
  items: SubMenuItemInterface[];
}

const SubMenu = (props: SubMenuProps) => {
  const { open, onClose, items } = props;

  const classes = classNames({
    container: true,
    open: open,
  });

  return (
    <div className={classes}>
      <header>{props.header}</header>
      <a className="closeBtn">
        <img src={CloseIcon} onClick={onClose} />
      </a>
      <ul className="subMenuItemContainer">
        {items.map((item, index) => (
          <li key={index} className="subMenuItem" onClick={onClose}>
            <Link href={item.href}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          width: 200px;
          min-height: 500px;
          background: ${Chroma(CSSConstants.primaryColor).brighten(0.3).css()};
          padding: 1em;
          padding-top: 1.7em;
          z-index: -1;
          margin-left: ${CSSConstants.sideNavBarWidth};
          transform: translateX(-110%);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1);
        }
        .container.open {
          transform: translateX(0%);
          transition: transform 0.33s cubic-bezier(0, 0, 0.3, 1);
        }
        .closeBtn {
          position: absolute;
          top: 1.5em;
          right: 1em;
        }
        header {
          font-size: 1.3rem;
          font-weight: bold;
          text-transform: capitalize;
          padding-left: 0.4em;
        }
        .subMenuItemContainer {
          margin-top: 2em;
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
        }
        .subMenuItem a {
          text-decoration: none;
          display: inline-block;
          padding: 0.6em;
          transition: all 0.3s;
          width: 100%;
        }
        .subMenuItem a:hover {
          background: ${CSSConstants.primaryColor};
        }
      `}</style>
    </div>
  );
};

export default SubMenu;
