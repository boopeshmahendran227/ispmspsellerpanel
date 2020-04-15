import { OrderInterface, OrderItemInterface } from "../../src/types/order";
import OrderActions from "../../src/actions/order";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import {
  getReturnRequestedOrderItems,
  getOrders,
  getCurrentlyProcessingOrderItemIds,
} from "../../src/selectors/order";
import { RequestReducerState } from "../../src/reducers/utils";
import OrderItemReturnRequest from "./OrderItemReturnRequest";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import EmptyMsg from "./EmptyMsg";

interface StateProps {
  orders: OrderInterface[];
  returnRequestedOrderItems: OrderItemInterface[];
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

type ReturnlationRequestContainerProps = StateProps & DispatchProps;

const ReturnlationRequestContainer = (
  props: ReturnlationRequestContainerProps
) => {
  const { returnRequestedOrderItems } = props;

  if (returnRequestedOrderItems.length === 0) {
    return <EmptyMsg msg="No Return Requests currently" />;
  }

  return (
    <div className="container">
      <TransitionGroup component={null}>
        {returnRequestedOrderItems.map((orderItem) => (
          <CSSTransition
            timeout={500}
            classNames="orderItemReturnRequest"
            key={orderItem.id}
          >
            <OrderItemReturnRequest
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
          font-size: 1.3rem;
        }
        :global(.orderItemReturnRequest-exit) {
          opacity: 1;
        }
        :global(.orderItemReturnRequest-exit-active) {
          opacity: 0;
          transition: all 0.5s cubic-bezier(0, 0, 0.31, 1);
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  orders: getOrders(state),
  returnRequestedOrderItems: getReturnRequestedOrderItems(state),
  getOrdersLoadingState: state.order.order,
  currentlyProcessingOrderItemIds: getCurrentlyProcessingOrderItemIds(state),
});

const mapDispatchToProps: DispatchProps = {
  getOrders: OrderActions.getOrders,
  changeOrderItemStatus: OrderActions.changeOrderItemStatus,
};

const mapPropsToLoadData = (props: ReturnlationRequestContainerProps) => {
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
)(WithReduxDataLoader(mapPropsToLoadData)(ReturnlationRequestContainer));
