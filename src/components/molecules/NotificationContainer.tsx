import * as React from "react";
import NotificationCard from "../atoms/NotificationCard";
import PageError from "../atoms/PageError";
import Loader from "../atoms/Loader";
import EmptyMsg from "../atoms/EmptyMsg";
import _ from "lodash";
import useSWR from "swr";
import { NotificationItemInterface } from "../../types/notification";
import moment from "moment";
import {Box}from"@chakra-ui/core";

const Notifications = () => {
  const swr = useSWR("/notification");
  const notifications = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!notifications) {
    return <Loader />;
  }

  // Sort notifications by created time
  const sortedNotifications: NotificationItemInterface[] = _.sortBy(
    notifications,
    (notification) => moment(notification.createdDateTime)
  ).reverse();

  return (
    <Box p="0.5em" className="container">
      {!sortedNotifications ||
        (Boolean(!sortedNotifications.length) && (
          <EmptyMsg msg="No Notifications" />
        ))}
      {sortedNotifications.map((notification, index) => (
        <NotificationCard key={index} notification={notification} />
      ))}
    </Box>
  );
};

export default Notifications;
