import ProductSaga from "./product";
import OrderSaga from "./order";
import RefreshDataSaga from "./refreshData";
import ToastSaga from "./toast";
import RealTimeNotificationSaga from "./realTimeNotification";
import LoaderSaga from "./loader";
import QuoteSaga from "./quote";
import UISaga from "./ui";
import SureConfirmationSaga from "./sureConfirmation";
import ReasonSaga from "./reason";
import LoginSaga from "./login";
import CouponSaga from "./coupon";
import CreditSaga from "./credit";
import SkuSaga from "./sku";
import SettingsSaga from "./settings";
import BulkSmsSaga from "./bulkSms";

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
    fork(QuoteSaga),
    fork(SureConfirmationSaga),
    fork(ReasonSaga),
    fork(UISaga),
    fork(LoginSaga),
    fork(CouponSaga),
    fork(CreditSaga),
    fork(SkuSaga),
    fork(SettingsSaga),
    fork(BulkSmsSaga),
  ]);
}
