import CSSConstants from "../../constants/CSSConstants";
import { OrderInterface } from "../../types/order";
import OrderSummary from "../atoms/OrderSummary";

interface OrderInformationProps {
  order: OrderInterface;
}

const OrderInformation = (props: OrderInformationProps) => {
  const { order } = props;

  return (
    <div className="container">
      <header>Order Information (#{order.id})</header>
      <h3>Order Summary</h3>
      <div className="body">
        <OrderSummary order={order} />
      </div>
      <style jsx>{`
        .container {
          border: ${CSSConstants.borderStyle};
          padding: 1em;
          margin: 2em 0;
          background: white;
        }
        header {
          font-weight: bold;
          font-size: 1.3rem;
          margin-bottom: 0.7em;
        }
      `}</style>
    </div>
  );
};

export default OrderInformation;
