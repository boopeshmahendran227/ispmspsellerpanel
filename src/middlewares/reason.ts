import { CANCEL_ORDER_ITEM } from "../constants/ActionTypes";
import UIActions from "../actions/ui";

const reason = (store) => (next) => (action) => {
  switch (action.type) {
    case CANCEL_ORDER_ITEM:
      store.dispatch(
        UIActions.showReasonModal(
          "Confirm Cancellation",
          "Please provide a cancellation reason",
          ["OrderedByMistake", "NoLongerNeedIt"],
          (reason: string) =>
            next({
              ...action,
              reason,
            })
        )
      );
      return;
  }
  next(action);
};

export default reason;
