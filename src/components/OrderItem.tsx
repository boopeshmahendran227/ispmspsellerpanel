import ProductCard from "../components/ProductCard";
import { OrderItemInterface, OrderStatus } from "../types/order";
import CSSConstants from "../constants/CSSConstants";
import Button from "./Button";
import { formatPrice, splitCamelCase } from "../utils/misc";
import _ from "lodash";
import { Fragment } from "react";
import classNames from "classnames";

interface OrderItemProps {
  orderItem: OrderItemInterface;
}

const getButtons = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PaymentSuccess:
    case OrderStatus.PaymentOnDelivery:
      return (
        <>
          <Button>Mark as shipping</Button>
          <Button outlined={true}>Cancel Order</Button>
        </>
      );
    case OrderStatus.Shipping:
      return (
        <>
          <Button>Mark as Delivered</Button>
        </>
      );
    case OrderStatus.CancelRequested:
      return (
        <>
          <Button>Approve Cancel Request</Button>
          <Button outlined={true}>Reject Cancel Request</Button>
        </>
      );
    case OrderStatus.ReturnRequested:
      return (
        <>
          <Button>Approve Return Request</Button>
          <Button outlined={true}>Reject Return Request</Button>
        </>
      );
  }
  return null;
};

const OrderItem = (props: OrderItemProps) => {
  const { orderItem } = props;
  const buttons = getButtons(orderItem.orderItemStatus);

  const classes = classNames({
    container: true,
    cancelComplete: orderItem.orderItemStatus === OrderStatus.CancelCompleted,
    shippingComplete:
      orderItem.orderItemStatus === OrderStatus.ShippingCompleted,
  });

  return (
    <div className={classes}>
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
        <div className="value total">
          {formatPrice(orderItem.discountedPrice)}
        </div>
      </div>
      {Boolean(buttons) && (
        <div className="buttonContainer">
          {getButtons(orderItem.orderItemStatus)}
        </div>
      )}
      <style jsx>{`
        .container {
          border: ${CSSConstants.borderStyle};
          background: ${CSSConstants.foregroundColor};
          max-width: 800px;
          margin: 0.5em auto;
          position: relative;
        }
        .container.cancelComplete {
          border-color: ${CSSConstants.dangerColor};
          opacity: 0.7;
        }
        .container.shippingComplete {
          border-color: ${CSSConstants.successColor};
          opacity: 0.7;
        }
        .container::before {
          content: "Cancelled Order";
          position: absolute;
          top: 0;
          left: 0;
          transform: translateY(-120%);
          color: ${CSSConstants.dangerColor};
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
          border-top: ${CSSConstants.borderStyle};
          padding: 0.5em;
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default OrderItem;
