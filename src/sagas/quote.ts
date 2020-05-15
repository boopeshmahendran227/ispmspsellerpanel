import { UPDATE_QUOTE } from "../constants/ActionTypes";
import { takeEvery, all, put } from "redux-saga/effects";
import QuoteActions from "../actions/quote";
import UIActions from "../actions/ui";

function* updateQuote(action) {
  yield put(QuoteActions.setCurrentQuote(action.quote));
  yield put(UIActions.showUpdateQuoteModal());
}

function* watchUpdateQuote() {
  yield takeEvery(UPDATE_QUOTE, updateQuote);
}

export default function* () {
  yield all([watchUpdateQuote()]);
}
