import ProductSaga from "./product";
import OrderSaga from "./order";
import RefreshDataSaga from "./refreshData";
import ToastSaga from "./toast";
import RealTimeNotificationSaga from "./realTimeNotification";
import LoaderSaga from "./loader";
import ShowroomVisitSaga from "./showroomVisit";
import QuoteSaga from "./quote";
import UISaga from "./ui";
import SureConfirmationSaga from "./sureConfirmation";
import ReasonSaga from "./reason";
import SearchSaga from "./search";
import DraftSaga from "./draft";
import LoginSaga from "./login";
import CouponSaga from "./coupon";
import { all, fork, spawn } from "redux-saga/effects";

export default function* rootSaga() {
  if (process.browser) {
    yield spawn(RealTimeNotificationSaga);
  }
  yield all([
    fork(ProductSaga),
    fork(OrderSaga),
    fork(ToastSaga),
    fork(RefreshDataSaga),
    fork(LoaderSaga),
    fork(ShowroomVisitSaga),
    fork(QuoteSaga),
    fork(SureConfirmationSaga),
    fork(ReasonSaga),
    fork(SearchSaga),
    fork(DraftSaga),
    fork(UISaga),
    fork(LoginSaga),
    fork(CouponSaga),
  ]);
}
