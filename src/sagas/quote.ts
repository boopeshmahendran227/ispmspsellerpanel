import {
  UPDATE_QUOTE,
  UPDATE_QUOTE_REQUEST,
  UPDATE_QUOTE_SUCCESS,
  UPDATE_QUOTE_FAILURE,
  REJECT_QUOTE_REQUEST,
  REJECT_QUOTE_SUCCESS,
  REJECT_QUOTE_FAILURE,
} from "../constants/ActionTypes";
import { takeEvery, all, put, call } from "redux-saga/effects";
import QuoteActions from "../actions/quote";
import UIActions from "../actions/ui";
import api from "../api";

function* updateQuote(action) {
  yield put(QuoteActions.setCurrentQuote(action.quote));
  yield put(UIActions.showUpdateQuoteModal());
}

function* updateQuoteRequest(action) {
  try {
    yield call(api, "/quote", {
      method: "PUT",
      data: {
        quoteId: action.quoteId,
        items: action.items,
      },
    });
    yield put({ type: UPDATE_QUOTE_SUCCESS });
  } catch (err) {
    yield put({ type: UPDATE_QUOTE_FAILURE });
  }
}

function* rejectQuoteRequest(action) {
  try {
    yield call(api, "/quote", {
      method: "PUT",
      data: {
        quoteId: action.quote.id,
        rejectQuote: true,
      },
    });
    yield put({ type: REJECT_QUOTE_SUCCESS });
  } catch (err) {
    yield put({ type: REJECT_QUOTE_FAILURE });
  }
}

function* watchUpdateQuote() {
  yield takeEvery(UPDATE_QUOTE, updateQuote);
}

function* watchUpdateQuoteRequest() {
  yield takeEvery(UPDATE_QUOTE_REQUEST, updateQuoteRequest);
}

function* watchRejectQuoteRequest() {
  yield takeEvery(REJECT_QUOTE_REQUEST, rejectQuoteRequest);
}

export default function* () {
  yield all([
    watchUpdateQuote(),
    watchUpdateQuoteRequest(),
    watchRejectQuoteRequest(),
  ]);
}
