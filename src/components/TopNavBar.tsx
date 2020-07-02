import CSSConstants from "../constants/CSSConstants";
import moment from "moment";
import { useState, useEffect } from "react";
import NotificationBar from "./NotificationBar";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getUnreadNotificationCount } from "../selectors/notification";
import NotificationActions from "../actions/notification";
import LoginActions from "../actions/login";
import classNames from "classnames";
import Logo from "./Logo";

interface StateProps {
  unreadNotificationCount: number;
}

interface DispatchProps {
  clearUnreadNotificationCount: () => void;
  logout: () => void;
}

type TopNavBarProps = StateProps & DispatchProps;

const TopNavBar = (props: TopNavBarProps) => {
  const [time, setTime] = useState(moment());
  const [notificationBarOpen, setNotificationBarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 60 * 1000);
    return () => clearInterval(timer);
  });

  const handleNotificationClick = () => {
    props.clearUnreadNotificationCount();
    setNotificationBarOpen(true);
  };

  const handleLogout = () => {
    props.logout();
  };

  const classes = classNames({
    notificationLink: true,
    animate: props.unreadNotificationCount > 0,
  });

  return (
    <div className="container">
      <div className="fixedContainer">
        <div className="logoContainer">
          <Logo />
        </div>
        <a
          className={classes}
          key={
            props.unreadNotificationCount
          } /* Retrigger animation when count changes */
          onClick={handleNotificationClick}
        >
          <i className="fas fa-bell"></i>
          {Boolean(props.unreadNotificationCount) && (
            <span className="notificationCount">
              {props.unreadNotificationCount}
            </span>
          )}
        </a>
        <div className="timeContainer">
          <i className="far fa-clock" aria-hidden={true}></i>
          <span className="time">{time.format("MMM D, hh:mm a")}</span>
        </div>
        <div className="logoutContainer">
          <a onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" aria-hidden={true}></i>
            Logout
          </a>
        </div>
        <NotificationBar
          open={notificationBarOpen}
          onClose={() => setNotificationBarOpen(false)}
        />
      </div>
      <style jsx>{`
        .container {
          height: 60px;
        }
        .fixedContainer {
          padding: 0.9em 1.3em;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
        }
        .logoContainer {
          flex: 1;
        }
        .time {
          display: inline-block;
          padding: 0.3em;
        }
        .logoutContainer {
          margin: 0 0.5em;
        }
        .notificationLink {
          font-size: 1.3rem;
          margin: 0 0.8em;
          position: relative;
          cursor: pointer;
        }
        .notificationCount {
          position: absolute;
          top: 0;
          right: 0;
          border-radius: 100%;
          background-color: ${CSSConstants.dangerColor};
          color: ${CSSConstants.foregroundColor};
          transform: translate(30%, -30%);
          width: 1.1rem;
          height: 1.1rem;
          line-height: 1.1rem;
          font-size: 0.7rem;
          text-align: center;
        }
        .notificationLink.animate i {
          animation: ring 1.5s ease;
        }
        @keyframes ring {
          0% {
            transform: rotate(35deg);
          }
          12.5% {
            transform: rotate(-30deg);
          }
          25% {
            transform: rotate(25deg);
          }
          37.5% {
            transform: rotate(-20deg);
          }
          50% {
            transform: rotate(15deg);
          }
          62.5% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  unreadNotificationCount: getUnreadNotificationCount(state),
});

const mapDispatchToProps: DispatchProps = {
  clearUnreadNotificationCount:
    NotificationActions.clearUnreadNotificationCount,
  logout: LoginActions.logout,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(TopNavBar);
