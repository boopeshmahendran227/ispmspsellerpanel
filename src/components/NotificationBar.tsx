import React from "react";
import classNames from "classnames";
import CSSConstants from "../constants/CSSConstants";
import NotificationContainer from "./NotificationContainer";

interface NotificationBarProps {
  open: boolean;
  onClose: () => void;
}

const NotificationBar = (props: NotificationBarProps) => {
  const blockClicks = (e) => {
    e.stopPropagation();
  };

  const classes = classNames({
    sideNavBar: true,
    sideNavBarVisible: props.open,
  });

  return (
    <section className={classes} onClick={props.onClose}>
      <div className="sideNavContainer" onClick={blockClicks}>
        <a className="closeBtn" href="#0" onClick={props.onClose}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </a>
        <div className="container">
          <NotificationContainer />
        </div>
      </div>
      <style jsx>{`
        .sideNavBar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        .sideNavBar::before {
          content: "";
          display: block;
          pointer-events: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          background: rgba(0, 0, 0, 0.5);
          transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1);
        }
        .sideNavContainer {
          position: absolute;
          top: 0;
          right: 0;
          width: 80%;
          max-width: 400px;
          background: white;
          color: ${CSSConstants.primaryTextColor};
          height: 100%;
          overflow-x: hidden;
          transform: translateX(102%);
        }
        .sideNavBarVisible .sideNavContainer {
          transform: translateX(0);
        }
        .closeBtn {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 1.8rem;
          z-index: 1;
        }
        .sideNavBarVisible {
          pointer-events: auto;
          touch-action: none;
        }
        .sideNavBarVisible::before {
          opacity: 1;
        }
        .sideNavContainer {
          transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1);
        }
        .sideNavContainer {
          transition: transform 0.33s cubic-bezier(0, 0, 0.3, 1);
        }
      `}</style>
    </section>
  );
};

export default NotificationBar;
