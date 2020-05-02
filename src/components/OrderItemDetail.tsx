import ProductCard from "./ProductCard";
import { OrderItemInterface, OrderStatus, getOrderText } from "../types/order";
import CSSConstants from "../constants/CSSConstants";
import Button, { ButtonType } from "./Button";
import { formatPrice, splitCamelCase } from "../utils/misc";
import _ from "lodash";
import { Fragment } from "react";
import Loader from "./Loader";
import moment from "moment";

interface OrderItemDetailProps {
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

const OrderItemDetail = (props: OrderItemDetailProps) => {
  const { orderItem } = props;

  const getButtons = () => {
    switch (orderItem.orderItemStatus) {
      case OrderStatus.PaymentSuccess:
      case OrderStatus.PaymentOnDelivery:
        return (
          <>
            <Button
              type={ButtonType.success}
              onClick={() =>
                props.markAsShipping(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
              }
            >
              Mark as Shipping
            </Button>
            <Button
              type={ButtonType.danger}
              onClick={() =>
                props.cancelOrderItem(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
              }
              outlined={true}
            >
              Cancel Order
            </Button>
          </>
        );
      case OrderStatus.PackageReadyForCollection:
        return (
          <>
            <Button
              type={ButtonType.success}
              onClick={() =>
                props.markAsShippingComplete(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
              }
            >
              Mark as Delivered & Cash Received
            </Button>
            <Button
              type={ButtonType.danger}
              onClick={() =>
                props.cancelOrderItem(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
              }
              outlined={true}
            >
              Cancel Order
            </Button>
          </>
        );
      case OrderStatus.Shipping:
        return (
          <>
            <Button
              type={ButtonType.success}
              onClick={() =>
                props.markAsShippingComplete(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
              }
            >
              Mark as Delivered
            </Button>
            <Button
              onClick={() =>
                props.cancelOrderItem(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
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
                props.approveCancelOrderItem(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
              }
              type={ButtonType.success}
            >
              Approve Cancel Request
            </Button>
            <Button
              onClick={() =>
                props.rejectCancelOrderItem(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
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
                props.approveReturnOrderItem(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
              }
              type={ButtonType.success}
            >
              Approve Return Request
            </Button>
            <Button
              onClick={() =>
                props.rejectReturnOrderItem(
                  props.orderItem.order.id,
                  props.orderItem.id
                )
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

  const getColor = () => {
    switch (orderItem.orderItemStatus) {
      case OrderStatus.PaymentSuccess:
      case OrderStatus.PaymentOnDelivery:
      case OrderStatus.PackageReadyForCollection:
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
    return CSSConstants.secondaryTextColor;
  };

  const buttons = getButtons();
  const color = getColor();
  const orderText = getOrderText(orderItem.orderItemStatus);

  const latestStatus =
    orderItem.orderItemStatusHistories[
      orderItem.orderItemStatusHistories.length - 1
    ];

  return (
    <div className="container">
      {props.inLoadingState && (
        <div className="loadingOverlay">
          <Loader width="2rem" height="2rem" />
          <div>Processing..</div>
        </div>
      )}
      <section className="itemContainer">
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
        <div className="totalContainer">
          <div>
            {formatPrice(orderItem.actualPrice)} x {orderItem.qty}
          </div>
          <div className="value">
            {formatPrice(orderItem.actualPrice * orderItem.qty)}
          </div>
          {_.map(orderItem.productSnapshot.discountSplit, (value, key) => (
            <Fragment key={key}>
              <div className="key">{splitCamelCase(key)}</div>
              <div className="value">- {formatPrice(value)}</div>
            </Fragment>
          ))}
          <div className="key total">Total</div>
          <div className="value total">{formatPrice(orderItem.finalPrice)}</div>
        </div>
      </section>
      {Boolean(buttons) && (
        <section className="buttonContainer">{buttons}</section>
      )}
      <style jsx>{`
        .container {
          border: 1px solid ${CSSConstants.borderColor};
          background: ${CSSConstants.foregroundColor};
          border-color: ${color};
          max-width: 800px;
          margin: auto;
          margin-bottom: 1em;
          position: relative;
        }
        .productContainer {
          padding: 0 0.5em;
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
          content: "${orderText} on 
          ${moment
            .utc(latestStatus.createdDateTime)
            .local()
            .format("MMM DD YYYY")}";
          color: ${color};
          position: absolute;
          top: 1em;
          right: 1em;
          font-size: 1.2rem;
        }
        .itemContainer {
          padding: 0.4em 0.8em;
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
          grid-template-columns: 150px 150px 120px;
          max-width: 420px;
          margin-left: auto;
          margin-top: -1.2rem;
        }
        .totalContainer .key {
          grid-column: 2;
          padding: 0.07em 0;
        }
        .totalContainer .value {
          grid-column: 3;
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

export default OrderItemDetail;