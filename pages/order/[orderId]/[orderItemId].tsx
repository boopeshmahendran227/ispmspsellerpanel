import moment from "moment";
import CSSConstants from "../../../src/constants/CSSConstants";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "../../../src/components/Loader";
import OrderItemDetail from "../../../src/components/OrderItemDetail";
import { formatAddress } from "../../../src/utils/misc";
import { connect } from "react-redux";
import OrderActions from "../../../src/actions/order";
import { RootState } from "../../../src/reducers";
import { getCurrentlyProcessingOrderItemIds } from "../../../src/selectors/order";
import { transformOrderItem } from "../../../src/transformers/orderItem";
import { getOrderText } from "../../../src/types/order";

interface StateProps {
  currentlyProcessingOrderItemIds: number[];
}

interface DispatchProps {
  markAsShippingComplete: (orderId: number, orderItemId: number) => void;
  markAsShipping: (orderId: number, orderItemId: number) => void;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  approveReturnOrderItem: (orderId: number, orderItemId: number) => void;
  rejectReturnOrderItem: (orderId: number, orderItemId: number) => void;
  cancelOrderItem: (orderId: number, orderItemId: number) => void;
}

type OrderProps = StateProps & DispatchProps;

const Order = (props: OrderProps) => {
  const router = useRouter();
  const { data: order } = useSWR(`/order/${router.query.orderId}`);

  if (!order) {
    return <Loader />;
  }

  const orderItem = transformOrderItem(
    order,
    order.items.find(
      (orderItem) => orderItem.id === Number(router.query.orderItemId)
    )
  );

  return (
    <div className="container">
      <Link href="/order">
        <a className="backBtn">
          <i className="icon fas fa-chevron-left"></i> Back to Orders
        </a>
      </Link>
      <header>
        <span className="id">
          #{order.id}-{orderItem.id}
        </span>{" "}
        <span className="time">
          {moment
            .utc(order.createdDateTime)
            .local()
            .format("MMMM Do YYYY h:mm a")}
        </span>{" "}
        <span className="status">
          {getOrderText(orderItem.orderItemStatus)}
        </span>
      </header>
      <div className="flexContainer">
        <div className="col1">
          <section className="itemContainer">
            <OrderItemDetail
              orderItem={orderItem}
              markAsShipping={props.markAsShipping}
              markAsShippingComplete={props.markAsShippingComplete}
              approveCancelOrderItem={props.approveCancelOrderItem}
              rejectCancelOrderItem={props.rejectCancelOrderItem}
              approveReturnOrderItem={props.approveReturnOrderItem}
              rejectReturnOrderItem={props.rejectReturnOrderItem}
              inLoadingState={props.currentlyProcessingOrderItemIds.includes(
                orderItem.id
              )}
              cancelOrderItem={props.cancelOrderItem}
            />
          </section>
        </div>
        <div className="col2">
          <section className="customerContainer">
            <div className="header">Customer Information</div>
            <div className="row">
              <div className="name">Name</div>
              <div className="value">Boopesh</div>
            </div>
            <div className="row">
              <div className="name">Billing Address</div>
              <div className="value">{formatAddress(order.billingAddress)}</div>
            </div>
            <div className="row">
              <div className="name">Shipping Address</div>
              <div className="value">
                {formatAddress(order.shippingAddress)}
              </div>
            </div>
          </section>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 1em auto;
          max-width: 1100px;
        }
        .flexContainer {
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-gap: 1em;
        }
        .col1 {
          flex: 1;
        }
        header .id {
          font-size: 1.6rem;
        }
        header {
          margin-bottom: 2.3em;
        }
        .time {
          color: ${CSSConstants.secondaryTextColor};
        }
        .status {
          border-radius: 2em;
          display: inline-block;
          background: ${CSSConstants.primaryColor};
          padding: 0.2em 0.5em;
          color: white;
          margin: 0 0.3em;
        }
        .customerContainer {
          background: ${CSSConstants.foregroundColor};
          border: ${CSSConstants.borderStyle};
        }
        .customerContainer .header {
          font-size: 1.3rem;
          padding: 0.3em 0.8em;
          margin: 0.4em 0;
        }
        .row {
          border-bottom: ${CSSConstants.borderStyle};
        }
        .name {
          padding: 0.8em;
          margin-top: 0.4em;
          font-weight: bold;
        }
        .value {
          padding-bottom: 0.4em;
          padding-left: 0.8em;
          padding-right: 0.8em;
        }
        .backBtn {
          display: inline-block;
          cursor: pointer;
          margin: 1em 0;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  currentlyProcessingOrderItemIds: getCurrentlyProcessingOrderItemIds(state),
});

const mapDispatchToProps: DispatchProps = {
  markAsShippingComplete: OrderActions.markAsShippingComplete,
  markAsShipping: OrderActions.markAsShipping,
  approveCancelOrderItem: OrderActions.approveCancelOrderItem,
  rejectCancelOrderItem: OrderActions.rejectCancelOrderItem,
  approveReturnOrderItem: OrderActions.approveReturnOrderItem,
  rejectReturnOrderItem: OrderActions.rejectReturnOrderItem,
  cancelOrderItem: OrderActions.cancelOrderItem,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Order);
