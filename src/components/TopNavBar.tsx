import CSSConstants from "../constants/CSSConstants";
import moment from "moment";
import { useState, useEffect } from "react";

const TopNavBar = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    }, 60 * 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="container">
      <header>Boopesh's Dashboard</header>
      <div className="notificationContainer">
        <i className="fas fa-bell"></i>
      </div>
      <div className="timeContainer">
        <i className="far fa-clock" aria-hidden={true}></i>
        <span className="time">{time.format("MMM D, hh:mm a")}</span>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          padding: 0.9em 1.3em;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
        }
        header {
          flex: 1;
          font-size: 1.5rem;
        }
        .time {
          display: inline-block;
          padding: 0.3em;
        }
        .notificationContainer {
          font-size: 1.2rem;
          padding: 0.5em;
          margin: 0 0.8em;
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

export default TopNavBar;
