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
import { OrderDetailInterface } from "../../../src/types/order";
import {
  getOrderStatusText,
  getPaymentText,
  getPaymentModeColor,
} from "../../../src/utils/order";
import PageError from "../../../src/components/PageError";
import ShippingInformationContainer from "../../../src/components/ShippingInformationContainer";
import OrderInformation from "../../../src/components/OrderInformation";
import WithAuth from "../../../src/components/WithAuth";
import { transformOrderItem } from "../../../src/transformers/orderItem";
import Button from "../../../src/components/Button";
import BackLink from "../../../src/components/atoms/BackLink";

interface DispatchProps {
  markAsShippingComplete: (orderId: number, orderItemId: number) => void;
  markAsShipping: (orderId: number, orderItemId: number) => void;
  markAsProcessing: (orderId: number, orderItemId: number) => void;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  approveReturnOrderItem: (orderId: number, orderItemId: number) => void;
  rejectReturnOrderItem: (orderId: number, orderItemId: number) => void;
  cancelOrderItem: (orderId: number, orderItemId: number) => void;
}

type OrderProps = DispatchProps;

const Order = (props: OrderProps) => {
  const router = useRouter();
  const swr = useSWR(`/order/${router.query.orderId}`);
  const order: OrderDetailInterface = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

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
      <BackLink href="/order">Back to Orders</BackLink>
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
          {getOrderStatusText(orderItem.orderItemStatus)}
        </span>
        <span
          style={{
            backgroundColor: getPaymentModeColor(
              orderItem.order.paymentSplits[0].paymentMode
            ),
          }}
          className="paymentMode"
        >
          {getPaymentText(orderItem.order.paymentSplits[0].paymentMode)}
        </span>
      </header>
      <div className="invoiceBtnContainer">
        <Button onClick={() => window.open(`/invoice/${orderItem.id}`)}>
          View Invoice
        </Button>
      </div>
      <div className="flexContainer">
        <div className="col1">
          <section className="itemContainer">
            <OrderItemDetail
              orderItem={orderItem}
              markAsShipping={props.markAsShipping}
              markAsShippingComplete={props.markAsShippingComplete}
              markAsProcessing={props.markAsProcessing}
              approveCancelOrderItem={props.approveCancelOrderItem}
              rejectCancelOrderItem={props.rejectCancelOrderItem}
              approveReturnOrderItem={props.approveReturnOrderItem}
              rejectReturnOrderItem={props.rejectReturnOrderItem}
              cancelOrderItem={props.cancelOrderItem}
            />
          </section>
          <div>
            <ShippingInformationContainer orderItem={orderItem} />
          </div>
        </div>
        <div className="col2">
          <section className="customerContainer">
            <div className="header">Customer Information</div>
            <div className="row">
              <div className="name">Name</div>
              <div className="value">
                {order.customerName || "Name Not Available"}
              </div>
            </div>
            {Boolean(order.customerPhone) && (
              <div className="row">
                <div className="name">Phone</div>
                <div className="value">{order.customerPhone}</div>
              </div>
            )}
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
          <div>
            <OrderInformation order={order} />
          </div>
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
          margin: 1em 0;
        }
        .invoiceBtnContainer {
          margin: 0.5em 0;
        }
        .time {
          color: ${CSSConstants.secondaryTextColor};
        }
        .status,
        .paymentMode {
          border-radius: 2em;
          display: inline-block;
          background: ${CSSConstants.primaryColor};
          padding: 0.2em 0.7em;
          color: white;
          margin: 0 0.3em;
        }
        .customerContainer {
          background: ${CSSConstants.foregroundColor};
          border: ${CSSConstants.borderStyle};
        }
        .customerContainer .header {
          font-weight: bold;
          font-size: 1.3rem;
          padding: 0.3em 0.5em;
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
      `}</style>
    </div>
  );
};

const mapDispatchToProps: DispatchProps = {
  markAsShippingComplete: OrderActions.markAsShippingComplete,
  markAsShipping: OrderActions.markAsShipping,
  approveCancelOrderItem: OrderActions.approveCancelOrderItem,
  rejectCancelOrderItem: OrderActions.rejectCancelOrderItem,
  approveReturnOrderItem: OrderActions.approveReturnOrderItem,
  rejectReturnOrderItem: OrderActions.rejectReturnOrderItem,
  cancelOrderItem: OrderActions.cancelOrderItem,
  markAsProcessing: OrderActions.markAsProcessing,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Order)
);
