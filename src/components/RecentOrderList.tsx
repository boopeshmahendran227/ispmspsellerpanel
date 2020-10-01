import React from "react";
import CSSConstants from "../constants/CSSConstants";
import { formatPrice } from "../utils/misc";
import Link from "next/link";
import ProductCard from "./molecules/ProductCard";
import { transformOrderItem } from "../transformers/orderItem";
import _ from "lodash";
import moment from "moment";
import { OrderInterface, TransformedOrderItemInterface } from "../types/order";
import SortableTable from "components/SortableTable";
import { getCustomerInfo } from "utils/customer";
import {
  getPaymentModeColor,
  getPaymentText,
  getColor,
  getOrderStatusText,
} from "utils/order";

const getTableHeaders = () => {
  return [
    {
      name: "Order Id",
      valueFunc: (orderItem: TransformedOrderItemInterface) => orderItem.id,
    },
    {
      name: "Item Id",
      valueFunc: (orderItem: TransformedOrderItemInterface) => orderItem.id,
    },
    {
      name: "Customer",
      valueFunc: (orderItem: TransformedOrderItemInterface) => null,
    },
    {
      name: "Product",
      valueFunc: (orderItem: TransformedOrderItemInterface) => null,
    },
    {
      name: "Price",
      valueFunc: (orderItem: TransformedOrderItemInterface) =>
        orderItem.discountedPrice,
    },
    {
      name: "Qty",
      valueFunc: (orderItem: TransformedOrderItemInterface) => orderItem.qty,
    },
    {
      name: "Payment",
      valueFunc: (orderItem: TransformedOrderItemInterface) =>
        orderItem.order.paymentSplits[0].paymentMode,
    },
    {
      name: "Status",
      valueFunc: (orderItem: TransformedOrderItemInterface) =>
        orderItem.orderItemStatus,
    },
    {
      name: "Date",
      valueFunc: (orderItem: TransformedOrderItemInterface) =>
        orderItem.createdDateTime,
    },
  ];
};

interface RecentOrderListProps {
  orders: OrderInterface[];
}

const RecentOrderList = (props: RecentOrderListProps): JSX.Element => {
  const orderItems: TransformedOrderItemInterface[] = _.chain(props.orders)
    .map((order) =>
      order.items.map((orderItem) => transformOrderItem(order, orderItem))
    )
    .flatten()
    .value();

  const renderTableBody = (orderItems: TransformedOrderItemInterface[]) => {
    return orderItems.map((orderItem) => (
      <Link
        key={orderItem.id}
        href="/order/[orderId]/[orderItemId]"
        as={`/order/${orderItem.order.id}/${orderItem.id}`}
      >
        <tr>
          <td>{orderItem.order.id}</td>
          <td>{orderItem.id}</td>
          <td>{getCustomerInfo(orderItem.order)}</td>
          <td>
            <div className="productContainer">
              <ProductCard
                name={orderItem.productSnapshot.productName}
                image={orderItem.productSnapshot.images[0]}
                metaInfo={[
                  ...orderItem.productSnapshot.attributeValues.map(
                    (attributeValue) => ({
                      key: attributeValue.attributeName,
                      value: attributeValue.value,
                    })
                  ),
                  {
                    key: "Product Id",
                    value: orderItem.productId,
                  },
                  {
                    key: "Sku Id",
                    value: orderItem.skuId,
                  },
                  {
                    key: "External Id",
                    value: orderItem.productSnapshot.externalId,
                  },
                ]}
              />
            </div>
          </td>
          <td>{formatPrice(orderItem.discountedPrice)}</td>
          <td>{orderItem.qty}</td>
          <td
            style={{
              color: getPaymentModeColor(
                orderItem.order.paymentSplits[0].paymentMode
              ),
            }}
          >
            {getPaymentText(orderItem.order.paymentSplits[0].paymentMode)}
          </td>
          <td
            style={{
              color: getColor(orderItem.orderItemStatus),
            }}
            className="status"
          >
            {getOrderStatusText(orderItem.orderItemStatus)}
          </td>
          <td>
            {moment
              .utc(orderItem.createdDateTime)
              .local()
              .format("DD MMM YYYY")}
          </td>
          <style jsx>{`
            .productContainer {
              text-align: initial;
              margin: 1.2em 0;
            }
            tr:hover {
              background-color: ${CSSConstants.hoverColor} !important;
              cursor: pointer;
            }
          `}</style>
        </tr>
      </Link>
    ));
  };

  return (
    <div className="container">
      <SortableTable
        initialSortData={{
          index: 8,
          isAsc: false,
        }}
        headers={getTableHeaders()}
        data={orderItems}
        emptyMsg="There are no recent orders"
        body={renderTableBody}
      />
      <style jsx>{`
        .container {
          max-height: 500px;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};
export default RecentOrderList;
