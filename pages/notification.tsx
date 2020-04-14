import * as React from "react";
import { connect } from "react-redux";
import NotificationActions from "../src/actions/notification";
import { getNotifications } from "../src/selectors/notification";
import WithReduxDataLoader from "../src/components/WithReduxDataLoader";
import NotificationCard from "../src/components/NotificationCard";
import { NotificationItemInterface } from "../src/types/notification";
import EmptyMsg from "../src/components/EmptyMsg";
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
          max-width: 800px;
          margin: auto;
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
