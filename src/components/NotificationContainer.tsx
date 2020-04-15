import * as React from "react";
import { connect } from "react-redux";
import NotificationActions from "../actions/notification";
import { getNotifications } from "../selectors/notification";
import WithReduxDataLoader from "./WithReduxDataLoader";
import NotificationCard from "./NotificationCard";
import { NotificationItemInterface } from "../types/notification";
import EmptyMsg from "./EmptyMsg";
import _ from "lodash";

interface StateProps {
  notifications: NotificationItemInterface[];
  getNotificationsState: any;
}

interface DispatchProps {
  getNotifications: () => void;
}

type NotificationsProps = StateProps & DispatchProps;

const Notifications = (props: NotificationsProps) => {
  const { notifications } = props;

  return (
    <div className="container">
      <div className="notificationsContainer">
        <h1>Notifications</h1>
        {!notifications ||
          (Boolean(!notifications.length) && (
            <EmptyMsg msg="No Notifications" />
          ))}
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>
      <style jsx>{`
        .container {
          padding: 0.5em;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state): StateProps => ({
  notifications: getNotifications(state),
  getNotificationsState: state.notification.notification,
});

const mapDispatchToProps: DispatchProps = {
  getNotifications: NotificationActions.getNotifications,
};

const mapPropsToLoadData = (props: NotificationsProps) => {
  return [
    {
      data: props.notifications,
      fetch: props.getNotifications,
      loadingState: props.getNotificationsState,
    },
  ];
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(Notifications));
