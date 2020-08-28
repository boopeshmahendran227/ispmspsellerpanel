import React from "react";
import CSSConstants from "../constants/CSSConstants";
import { formatPrice } from "../utils/misc";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { transformOrderItem } from "../transformers/orderItem";
import _ from "lodash";

interface recentOrdersProps {
  data?: any;
}

const RecentOrders = (props: recentOrdersProps): JSX.Element => {
  const orderItems = _.chain(props.data.results)
    .map((order) =>
      order.items.map((orderItem) => transformOrderItem(order, orderItem))
    )
    .flatten()
    .value();

  const renderTableBody = () => {
    return orderItems.map((orderItem) => {
      return (
        <Link
          key={orderItem.id}
          href="/order/[orderId]/[orderItemId]"
          as={`/order/${orderItem.order.id}/${orderItem.id}`}
        >
          <tr key={orderItem.id}>
            <td>{orderItem.order.id}</td>
            <td>{orderItem.id}</td>
            <td>{orderItem.order.customerName}</td>
            <td>
              <ProductCard
                name={orderItem.productSnapshot.productName}
                image={orderItem.productSnapshot.images[0]}
              />
            </td>
            <td className="noWrapContainer">
              {formatPrice(orderItem.actualPrice)}
            </td>

            <td>{orderItem.order.qty}</td>
            <td>{orderItem.order.orderStatus}</td>

            <td className="noWrapContainer">
              {orderItem.order.createdDateTime.slice(0, 10)}
            </td>

            <style jsx>{`
              .noWrapContainer {
                white-space: nowrap;
              }

              tr:hover {
                background-color: ${CSSConstants.hoverColor} !important;
                cursor: pointer;
              }

              tr {
                border-top: 0.5px solid ${CSSConstants.borderColor};
                border-bottom: 0.5px solid ${CSSConstants.borderColor};
              }

              td {
                padding: 1.5vh 1vw;
              }
            `}</style>
          </tr>
        </Link>
      );
    });
  };

  return (
    <div>
      <table>
        <thead>
          <th>Order ID</th>
          <th>Item ID</th>
          <th>Customer</th>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Payment</th>
          <th> Date</th>
        </thead>
        {renderTableBody()}
      </table>
    </div>
  );
};
export default RecentOrders;
