import {
  APPROVE_CANCEL_ORDER_ITEM,
  REJECT_CANCEL_ORDER_ITEM,
  MARK_AS_SHIPPING_COMPLETE,
  MARK_AS_SHIPPING,
  REJECT_RETURN_ORDER_ITEM,
  APPROVE_RETURN_ORDER_ITEM,
} from "../constants/ActionTypes";
import UIActions from "../actions/ui";

const sureConfirmation = (store) => (next) => (action) => {
  switch (action.type) {
    case APPROVE_CANCEL_ORDER_ITEM:
      store.dispatch(
        UIActions.showSureModal(
          "Confirm Cancellation",
          `Are you sure you want to approve the cancellation request for Order Item #${action.orderItemId}?`,
          () => next(action)
        )
      );
      return;
    case REJECT_CANCEL_ORDER_ITEM:
      store.dispatch(
        UIActions.showSureModal(
          "Confirm Rejection",
          `Are you sure you want to reject the cancellation request for Order Item #${action.orderItemId}?`,
          () => next(action)
        )
      );
      return;
    case APPROVE_RETURN_ORDER_ITEM:
      store.dispatch(
        UIActions.showSureModal(
          "Confirm Return request",
          `Are you sure you want to approve the return request and schedule pickup for Order Item #${action.orderItemId}?`,
          () => next(action)
        )
      );
      return;
    case REJECT_RETURN_ORDER_ITEM:
      store.dispatch(
        UIActions.showSureModal(
          "Confirm Rejection",
          `Are you sure you want to reject the return request for Order Item #${action.orderItemId}?`,
          () => next(action)
        )
      );
      return;
    case MARK_AS_SHIPPING:
      store.dispatch(
        UIActions.showSureModal(
          "Confirm Shipping",
          `Are you sure you want to mark Order Item #${action.orderItemId} as Shipping?`,
          () => next(action)
        )
      );
      return;
    case MARK_AS_SHIPPING_COMPLETE:
      store.dispatch(
        UIActions.showSureModal(
          "Confirm Delivery",
          `Are you sure you want to mark Order Item #${action.orderItemId} as Delivered?`,
          () => next(action)
        )
      );
      return;
  }
  next(action);
};

export default sureConfirmation;
