import QuoteSaga from "./quote";
import ProductSaga from "./product";
import OrderSaga from "./order";
import RefreshDataSaga from "./refreshData";
import ToastSaga from "./toast";
import RealTimeNotificationSaga from "./realTimeNotification";
import NotificationSaga from "./notification";
import LoaderSaga from "./loader";
import ShowroomVisitSaga from "./showroomVisit";
import TestDriveSaga from "./testDrive";
import { all, fork, spawn } from "redux-saga/effects";

export default function* rootSaga() {
  if (process.browser) {
    yield spawn(RealTimeNotificationSaga);
  }
  yield all([
    fork(QuoteSaga),
    fork(ProductSaga),
    fork(OrderSaga),
    fork(ToastSaga),
    fork(RefreshDataSaga),
    fork(NotificationSaga),
    fork(LoaderSaga),
    fork(ShowroomVisitSaga),
    fork(TestDriveSaga),
  ]);
}
