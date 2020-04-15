import CSSConstants from "../constants/CSSConstants";
import { OrderItemInterface } from "../types/order";
import Button, { ButtonType } from "./Button";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface OrderItemCancelRequestProps {
  orderItem: OrderItemInterface;
}

const OrderItemCancelRequest = (props: OrderItemCancelRequestProps) => {
  const { orderItem } = props;

  return (
    <div className="card">
      <Link href="/order/[id]" as={`/order/${orderItem.order.id}`}>
        <header>
          <a>Order Item #{orderItem.id}</a>
        </header>
      </Link>
      <div className="body">
        Customer #{orderItem.order.customerId} has requested cancellation of
        Order Item #{orderItem.id}
      </div>
      <div>
        <Link href="/order/[id]" as={`/order/${orderItem.order.id}`}>
          <a>View Order</a>
        </Link>
      </div>
      <ProductCard
        name={orderItem.productSnapshot.productName}
        image={orderItem.productSnapshot.images[0]}
        attributeValues={orderItem.productSnapshot.attributeValues}
        qty={orderItem.qty}
      />
      <div className="buttonContainer">
        <Button type={ButtonType.success}>Approve</Button>
        <Button type={ButtonType.danger}>Reject</Button>
      </div>
      <style jsx>{`
        .card {
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          padding: 0.5em;
          margin: 1em 0;
        }
        header {
          font-size: 1.2rem;
          margin: 0.7em 0;
          font-weight: bold;
        }
        .body {
          margin: 0.4em 0;
        }
        a {
          color: ${CSSConstants.primaryColor};
        }
      `}</style>
    </div>
  );
};

export default OrderItemCancelRequest;
