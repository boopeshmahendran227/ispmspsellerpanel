import CSSConstants from "../constants/CSSConstants";
import { OrderItemInterface } from "../types/order";
import { isCompletedOrderStatus, isShippingOrderStatus } from "utils/order";
import moment from "moment";

interface ShippingInformationContainerProps {
  orderItem: OrderItemInterface;
}

const ShippingInformationContainer = (
  props: ShippingInformationContainerProps
) => {
  const { orderItem } = props;

  if (
    !isShippingOrderStatus(orderItem.orderItemStatus) &&
    !isCompletedOrderStatus(orderItem.orderItemStatus)
  ) {
    return null;
  }

  return (
    <div className="container">
      <div className="headerContainer">
        <header>Shipping Information</header>
        <a href={orderItem.shipment.shiprocketResponse?.label_url}>
          Download Shipping Label
        </a>
        <a href={orderItem.shipment.shiprocketResponse?.manifest_url}>
          Download Manifest
        </a>
      </div>
      <table>
        <tr>
          <td className="key"> Provider Name:</td>
          <td> {orderItem.shipment.providerName}</td>
        </tr>
        <tr>
          <td className="key">Tracking Code:</td>
          <td>AWB-{orderItem.shipment.shiprocketResponse?.awb_code}</td>
        </tr>
        <tr>
          <td className="key">Pickup Token Number:</td>
          <td>{orderItem.shipment.shiprocketResponse?.pickup_token_number}</td>
        </tr>
        <tr>
          <td className="key">Pickup Scheduled Date: </td>
          <td>
            {moment(
              orderItem.shipment.shiprocketResponse?.pickup_scheduled_date
            ).format("MMM D, YYYY")}
          </td>
        </tr>
      </table>
      <style jsx>{`
        .container {
          border: ${CSSConstants.borderStyle};
          padding: 1em;
          margin: 2em 0;
          background: white;
        }
        .headerContainer {
          display: flex;
          align-items: baseline;
        }
        header {
          font-weight: bold;
          font-size: 1.3rem;
          margin-bottom: 0.9em;
        }
        a {
          color: ${CSSConstants.secondaryColor};
          display: inline-block;
          margin: 0 0.5em;
          text-decoration: underline;
        }
        .key {
          color: ${CSSConstants.secondaryTextColor};
        }
      `}</style>
    </div>
  );
};

export default ShippingInformationContainer;
