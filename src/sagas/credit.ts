import {
  UPDATE_CREDITS_REQUEST,
  UPDATE_CREDITS_SUCCESS,
  UPDATE_CREDITS_FAILURE,
  UPDATE_CREDITS,
} from "../constants/ActionTypes";
import { takeLatest, all, call, put } from "redux-saga/effects";
import api from "../api";
import { UpdateCreditsRequestAction } from "../types/credit";
import UIActions from "../actions/ui";
import InvoiceActions from "../actions/invoice";

function* updateCredits(action) {
  yield put(InvoiceActions.setCurrentInvoice(action.invoice));
  yield put(UIActions.showUpdateCreditsModal());
}

function* updateCreditsRequest(action: UpdateCreditsRequestAction) {
  try {
    yield call(api, `/sellercredits`, {
      method: "PUT",
      data: {
        invoiceId: action.invoiceId,
        creditsPaid: action.creditsPaid,
        paymentMode: action.paymentMode,
        paymentReferenceId: action.paymentReferenceId,
      },
    });
    yield put({ type: UPDATE_CREDITS_SUCCESS });
  } catch (err) {
    yield put({ type: UPDATE_CREDITS_FAILURE });
  }
}

function* watchUpdateCreditsRequest() {
  yield takeLatest(UPDATE_CREDITS_REQUEST, updateCreditsRequest);
}

function* watchUpdateCredits() {
  yield takeLatest(UPDATE_CREDITS, updateCredits);
}

export default function* () {
  yield all([watchUpdateCredits(), watchUpdateCreditsRequest()]);
}
