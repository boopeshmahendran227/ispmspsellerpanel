import CSSConstants from "../constants/CSSConstants";
import { OrderItemInterface } from "../types/order";
import Button, { ButtonType } from "./Button";
import ProductCard from "./ProductCard";
import Link from "next/link";
import Loader from "./Loader";

interface OrderItemCancelRequestProps {
  orderItem: OrderItemInterface;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  inLoadingState: boolean;
}

const OrderItemCancelRequest = (props: OrderItemCancelRequestProps) => {
  const { orderItem } = props;

  const handleApproveClick = () => {
    props.approveCancelOrderItem(orderItem.order.id, orderItem.id);
  };

  const handleRejectClick = () => {
    props.rejectCancelOrderItem(orderItem.order.id, orderItem.id);
  };

  return (
    <div className="card">
      {props.inLoadingState && (
        <div className="loadingOverlay">
          <Loader width="2rem" height="2rem" />
          <div>Processing..</div>
        </div>
      )}
      <Link href="/order/[id]" as={`/order/${orderItem.order.id}`}>
        <header>
          <a>Cancellation Requested for Order Item #{orderItem.id}</a>
        </header>
      </Link>
      <div className="body">
        Customer #{orderItem.order.customerId} has requested cancellation of
        Order Item #{orderItem.id}
      </div>
      <div>
        <Link
          href="/order/[orderId]/[orderItemId]"
          as={`/order/${orderItem.order.id}/${orderItem.id}`}
        >
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
        <Button onClick={handleApproveClick} type={ButtonType.success}>
          Approve
        </Button>
        <Button onClick={handleRejectClick} type={ButtonType.danger}>
          Reject
        </Button>
      </div>
      <style jsx>{`
        .card {
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          padding: 0.5em;
          margin: 1em 0;
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
