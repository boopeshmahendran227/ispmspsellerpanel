import { OrderInterface, OrderItemInterface } from "../../src/types/order";
import OrderActions from "../../src/actions/order";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import {
  getCancelRequestedOrderItems,
  getOrders,
} from "../../src/selectors/order";
import { RequestReducerState } from "../../src/reducers/utils";
import OrderItemCancelRequest from "./OrderItemCancelRequest";

interface StateProps {
  orders: OrderInterface[];
  cancelRequestedOrderItems: OrderItemInterface[];
  getOrdersLoadingState: RequestReducerState;
}

interface DispatchProps {
  getOrders: () => void;
}

type CancellationRequestContainerProps = StateProps & DispatchProps;

const CancellationRequestContainer = (
  props: CancellationRequestContainerProps
) => {
  const { cancelRequestedOrderItems } = props;

  return (
    <div className="container">
      <header>Order Cancellation Requests</header>
      {cancelRequestedOrderItems.map((orderItem) => (
        <OrderItemCancelRequest orderItem={orderItem} />
      ))}
      <style jsx>{`
        .container {
          padding: 0.9em;
        }
        header {
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  orders: getOrders(state),
  cancelRequestedOrderItems: getCancelRequestedOrderItems(state),
  getOrdersLoadingState: state.order.order,
});

const mapDispatchToProps: DispatchProps = {
  getOrders: OrderActions.getOrders,
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
