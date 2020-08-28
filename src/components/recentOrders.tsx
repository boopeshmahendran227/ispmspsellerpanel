import React from "react";
import CSSConstants from "../constants/CSSConstants";
import { formatPrice } from "../utils/misc";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { transformOrderItem } from "../transformers/orderItem";
import _ from "lodash";
import moment from "moment";
import { OrderInterface } from "../types/order";

interface RecentOrdersProps {
  data: OrderInterface;
}

const RecentOrders = (props: RecentOrdersProps): JSX.Element => {
  const orderItems = _.chain(props.data)
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

            <td>{orderItem.qty}</td>
            <td>{orderItem.order.orderStatus}</td>

            <td className="dateContainer">
              {moment
                .utc(orderItem.order.createdDateTime)
                .local()
                .format("MMMM Do YYYY")}
            </td>

            <style jsx>{`
              .noWrapContainer {
                white-space: nowrap;
              }
              .dateContainer {
                max-width: 5rem;
              }

              tr:hover {
                background-color: ${CSSConstants.hoverColor} !important;
                cursor: pointer;
              }

              tr {
                border-top: 0.5px solid ${CSSConstants.borderColor};
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
        <tbody>{renderTableBody()}</tbody>
      </table>
      <style jsx>{``}</style>
    </div>
  );
};
export default RecentOrders;
