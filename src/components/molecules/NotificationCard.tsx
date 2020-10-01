import CSSConstants from "../../constants/CSSConstants";
import _ from "lodash";
import moment from "moment";
import { NotificationItemInterface } from "../../types/notification";

interface NotificationCardProps {
  notification: NotificationItemInterface;
}

const NotificationCard = (props: NotificationCardProps) => {
  return (
    <section className="container">
      <div className="iconContainer">
        <i className="far fa-envelope"></i>
      </div>
      <div className="contentContainer">
        <header>{props.notification.subject}</header>
        <div className="message">{props.notification.message}</div>
        <div className="time">
          {moment.utc(props.notification.createdDateTime).local().fromNow()}
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 0.5em 0;
          padding: 1em;
          background: #fff;
          display: grid;
          grid-template-columns: 50px auto;
          border-bottom: ${CSSConstants.borderStyle};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        .iconContainer {
          font-size: 1.9em;
        }
        header {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 0.2em;
        }
        .message {
          margin-bottom: 0.4em;
        }
        .time {
          font-size: 0.9em;
          color: grey;
        }
      `}</style>
    </section>
  );
};

export default NotificationCard;
