import { APPROVE_CANCEL_ORDER_ITEM } from "../constants/ActionTypes";
import UIActions from "../actions/ui";

const sureConfirmation = (store) => (next) => (action) => {
  if (action.type === APPROVE_CANCEL_ORDER_ITEM) {
    store.dispatch(
      UIActions.showSureModal(
        "Confirm Cancellation",
        `Are you sure you want to approve the cancellation request for Order Item #${action.orderItemId}?`,
        () => next(action)
      )
    );
  } else {
    next(action);
  }
};

export default sureConfirmation;
