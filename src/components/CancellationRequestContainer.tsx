import { OrderInterface, OrderItemInterface } from "../../src/types/order";
import OrderActions from "../../src/actions/order";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import {
  getCancelRequestedOrderItems,
  getOrders,
  getCurrentlyProcessingOrderItemIds,
} from "../../src/selectors/order";
import { RequestReducerState } from "../../src/reducers/utils";
import OrderItemCancelRequest from "./OrderItemCancelRequest";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface StateProps {
  orders: OrderInterface[];
  cancelRequestedOrderItems: OrderItemInterface[];
  getOrdersLoadingState: RequestReducerState;
  currentlyProcessingOrderItemIds: number[];
}

interface DispatchProps {
  getOrders: () => void;
  changeOrderItemStatus: (
    orderId: number,
    orderItemId: number,
    orderItemStatus: string
  ) => void;
}

type CancellationRequestContainerProps = StateProps & DispatchProps;

const CancellationRequestContainer = (
  props: CancellationRequestContainerProps
) => {
  const { cancelRequestedOrderItems } = props;

  return (
    <div className="container">
      <header>Order Cancellation Requests</header>
      <TransitionGroup component={null}>
        {cancelRequestedOrderItems.map((orderItem) => (
          <CSSTransition
            timeout={500}
            classNames="orderItemCancelRequest"
            key={orderItem.id}
          >
            <OrderItemCancelRequest
              orderItem={orderItem}
              changeOrderItemStatus={props.changeOrderItemStatus}
              inLoadingState={props.currentlyProcessingOrderItemIds.includes(
                orderItem.id
              )}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <style jsx>{`
        .container {
          padding: 0.9em;
        }
        header {
          font-size: 1.5rem;
        }
        :global(.orderItemCancelRequest-enter) {
          opacity: 0;
        }
        :global(.orderItemCancelRequest-enter-active) {
          opacity: 1;
          transition: all 0.5s cubic-bezier(0, 0, 0.31, 1);
        }
        :global(.orderItemCancelRequest-exit) {
          opacity: 1;
        }
        :global(.orderItemCancelRequest-exit-active) {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  orders: getOrders(state),
  cancelRequestedOrderItems: getCancelRequestedOrderItems(state),
  getOrdersLoadingState: state.order.order,
  currentlyProcessingOrderItemIds: getCurrentlyProcessingOrderItemIds(state),
});

const mapDispatchToProps: DispatchProps = {
  getOrders: OrderActions.getOrders,
  changeOrderItemStatus: OrderActions.changeOrderItemStatus,
};

const mapPropsToLoadData = (props: CancellationRequestContainerProps) => {
  return [
    {
      data: props.orders,
      fetch: props.getOrders,
      loadingState: props.getOrdersLoadingState,
    },
  ];
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(CancellationRequestContainer));
