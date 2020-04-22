import * as signalR from "@microsoft/signalr";
import { call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { parseCookies } from "nookies";
import ToastActions from "../actions/toast";
import NotificationActions from "../actions/notification";
import { NotificationItemInterface } from "../types/notification";
import { ToastType } from "../types/toast";

function* createNotificationChannel() {
  return eventChannel((emit) => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://mplnotifydev.istakapaza.com/chat", {
        accessTokenFactory: () => parseCookies()["isp-jwt"],
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    const start = async () => {
      try {
        await connection.start();
      } catch (err) {
        setTimeout(() => start(), 10000);
      }
    };

    start();

    connection.on("newMessage", (notification) => {
      emit(notification);
    });

    connection.onclose(() => {
      console.log("Disconnected");
      start();
    });

    return () => connection.stop();
  });
}

export default function* () {
  const notificationChannel = yield call(createNotificationChannel);

  while (true) {
    try {
      const notification: NotificationItemInterface = yield take(
        notificationChannel
      );
      if (Audio) {
        new Audio("/notification.mp3").play();
      }
      yield put(NotificationActions.incrementUnreadNotificationCount());
      yield put(
        ToastActions.addToast({
          type: ToastType.notification,
          header: notification.subject,
          msg: notification.message,
        })
      );
      yield put(NotificationActions.getNotifications());
    } catch (err) {
      notificationChannel.close();
    }
  }
}
