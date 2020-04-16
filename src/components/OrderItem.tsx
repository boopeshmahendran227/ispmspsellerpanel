import ProductCard from "../components/ProductCard";
import { OrderItemInterface, OrderStatus } from "../types/order";
import CSSConstants from "../constants/CSSConstants";
import Button, { ButtonType } from "./Button";
import { formatPrice, splitCamelCase } from "../utils/misc";
import _ from "lodash";
import { Fragment } from "react";
import Loader from "./Loader";

interface OrderItemProps {
  orderId: number;
  orderItem: OrderItemInterface;
  markAsShipping: (orderId: number, orderItemId: number) => void;
  markAsShippingComplete: (orderId: number, orderItemId: number) => void;
  approveReturnOrderItem: (orderId: number, orderItemId: number) => void;
  rejectReturnOrderItem: (orderId: number, orderItemId: number) => void;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  cancelOrderItem: (orderId: number, orderItemId: number) => void;
  inLoadingState: boolean;
}

const OrderItem = (props: OrderItemProps) => {
  const { orderItem } = props;

  const getButtons = () => {
    switch (orderItem.orderItemStatus) {
      case OrderStatus.PaymentSuccess:
      case OrderStatus.PaymentOnDelivery:
        return (
          <>
            <Button
              onClick={() =>
                props.markAsShipping(props.orderId, props.orderItem.id)
              }
            >
              Mark as shipping
            </Button>
            <Button outlined={true}>Cancel Order</Button>
          </>
        );
      case OrderStatus.Shipping:
        return (
          <>
            <Button
              type={ButtonType.success}
              onClick={() =>
                props.markAsShippingComplete(props.orderId, props.orderItem.id)
              }
            >
              Mark as Delivered
            </Button>
            <Button
              onClick={() =>
                props.cancelOrderItem(props.orderId, props.orderItem.id)
              }
              type={ButtonType.danger}
              outlined={true}
            >
              Cancel Order
            </Button>
          </>
        );
      case OrderStatus.CancelRequested:
        return (
          <>
            <Button
              onClick={() =>
                props.approveCancelOrderItem(props.orderId, props.orderItem.id)
              }
              type={ButtonType.success}
            >
              Approve Cancel Request
            </Button>
            <Button
              onClick={() =>
                props.rejectCancelOrderItem(props.orderId, props.orderItem.id)
              }
              outlined={true}
              type={ButtonType.danger}
            >
              Reject Cancel Request
            </Button>
          </>
        );
      case OrderStatus.ReturnRequested:
        return (
          <>
            <Button
              onClick={() =>
                props.approveReturnOrderItem(props.orderId, props.orderItem.id)
              }
              type={ButtonType.success}
            >
              Approve Return Request
            </Button>
            <Button
              onClick={() =>
                props.rejectReturnOrderItem(props.orderId, props.orderItem.id)
              }
              type={ButtonType.danger}
              outlined={true}
            >
              Reject Return Request
            </Button>
          </>
        );
    }
    return null;
  };

  const getOrderText = () => {
    switch (orderItem.orderItemStatus) {
      case OrderStatus.PaymentSuccess:
      case OrderStatus.PaymentOnDelivery:
        return "Pending";
      case OrderStatus.Shipping:
        return "Shipping";
      case OrderStatus.ShippingCompleted:
        return "Delivered";
      case OrderStatus.CancelRequested:
        return "Cancel Requested";
      case OrderStatus.CancelCompleted:
        return "Cancelled";
      case OrderStatus.ReturnRequested:
        return "Return Requested";
    }
    return orderItem.orderItemStatus;
  };

  const getColor = () => {
    switch (orderItem.orderItemStatus) {
      case OrderStatus.PaymentSuccess:
      case OrderStatus.PaymentOnDelivery:
        return CSSConstants.secondaryTextColor;
      case OrderStatus.Shipping:
      case OrderStatus.ShippingCompleted:
        return CSSConstants.successColor;
      case OrderStatus.CancelRequested:
      case OrderStatus.CancelCompleted:
        return CSSConstants.dangerColor;
      case OrderStatus.ReturnRequested:
      case OrderStatus.ReturnCompleted:
        return CSSConstants.warningColor;
    }
  };

  const buttons = getButtons();
  const color = getColor();
  const orderText = getOrderText();
  const finalPrice =
    orderItem.actualPrice * orderItem.qty - orderItem.totalDiscount;

  return (
    <div className="container">
      {props.inLoadingState && (
        <div className="loadingOverlay">
          <Loader width="2rem" height="2rem" />
          <div>Processing..</div>
        </div>
      )}
      <section className="grid">
        <div className="productContainer">
          <ProductCard
            name={orderItem.productSnapshot.productName}
            image={orderItem.productSnapshot.images[0]}
            attributeValues={orderItem.productSnapshot.attributeValues}
          />
          <div className="info">
            <div className="key">Product Id: </div>
            <div className="value">{orderItem.productId}</div>
            <div className="key">SKU: </div>
            <div className="value">{orderItem.skuId}</div>
          </div>
        </div>
        <div className="actualPrice">
          {formatPrice(orderItem.actualPrice)} x {orderItem.qty}
        </div>
        <div className="totalPrice">
          {formatPrice(orderItem.actualPrice * orderItem.qty)}
        </div>
      </section>
      <div className="totalContainer">
        {_.map(orderItem.productSnapshot.discountSplit, (value, key) => (
          <Fragment key={key}>
            <div className="key">{splitCamelCase(key)}</div>
            <div className="value">{formatPrice(value)}</div>
          </Fragment>
        ))}
        <div className="key total">Total</div>
        <div className="value total">{formatPrice(finalPrice)}</div>
      </div>
      {Boolean(buttons) && <div className="buttonContainer">{buttons}</div>}
      <style jsx>{`
        .container {
          border: 1px solid ${CSSConstants.borderColor};
          background: ${CSSConstants.foregroundColor};
          border-color: ${color};
          max-width: 800px;
          margin: auto;
          position: relative;
        }
        .loadingOverlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0.7;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .container::before {
          content: "${orderText}";
          text-transform: uppercase;
          letter-spacing: 2px;
          color: ${color};
          position: absolute;
          top: 1em;
          right: 1em;
          font-size: 1.2rem;
        }
        .status {
          padding: 0.3em 0.8em;
          font-size: 1.3rem;
        }
        .grid {
          display: flex;
          padding: 0.4em 0.9em;
          justify-content: space-around;
          align-items: flex-end;
        }
        .info {
          display: grid;
          grid-template-columns: 100px 100px;
          color: ${CSSConstants.secondaryTextColor};
        }
        .info .key {
          font-weight: bold;
        }
        .totalContainer {
          display: grid;
          grid-template-columns: 200px 120px;
          max-width: 320px;
          margin-left: auto;
        }
        .totalContainer .key,
        .totalContainer .value {
          padding: 0.07em 0;
        }
        .totalContainer .total {
          padding: 0.2em 0;
          font-weight: bold;
        }
        .buttonContainer {
          margin-top: 1em;
          border-top: 1px solid ${color};
          padding: 0.5em;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default OrderItem;
