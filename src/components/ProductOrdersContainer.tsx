import useSWR from "swr";
import Loader from "./Loader";
import { ProductOrderInterface, OrderItemCountMap } from "../types/order";
import SortableTable from "./SortableTable";
import ProductCard from "./ProductCard";
import _ from "lodash";
import { isPendingOrderStatus, isShippingOrderStatus } from "../utils/order";
import ErrorMsg from "./ErrorMsg";

const getTableHeaders = () => {
  return [
    {
      name: "Product",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
    {
      name: "Pending Orders",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
    {
      name: "Shipping Orders",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
    {
      name: "Total Open Orders",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
  ];
};

const getOrderItemCount = (orderItemCount: OrderItemCountMap, filterFunc) => {
  return _.chain(orderItemCount)
    .pickBy((value, key) => filterFunc(key))
    .map((item) => item.orderCount)
    .sum()
    .value();
};

const getQty = (orderItemCount: OrderItemCountMap, filterFunc) => {
  return _.chain(orderItemCount)
    .pickBy((value, key) => filterFunc(key))
    .map((item) => item.qty)
    .sum()
    .value();
};

const renderTableBody = (productOrders: ProductOrderInterface[]) => {
  return productOrders.map((productOrder) => (
    <tr>
      <td>
        <ProductCard
          name={productOrder.productName}
          image={productOrder.imagePath}
          metaInfo={[
            {
              key: "Product Id",
              value: productOrder.productId,
            },
            {
              key: "SKU Id",
              value: productOrder.skuId,
            },
            {
              key: "External Id",
              value: productOrder.externalId,
            },
          ]}
        />
      </td>
      {[
        isPendingOrderStatus,
        isShippingOrderStatus,
        (key) => isPendingOrderStatus(key) || isShippingOrderStatus(key),
      ].map((filterFunc) => (
        <td>
          <div className="row">
            <span className="key">Order Count: </span>
            <span className="value">
              {getOrderItemCount(productOrder.orderItemCount, filterFunc)}
            </span>
          </div>
          <div className="row">
            <span className="key">Qty: </span>
            <span className="value">
              {getQty(productOrder.orderItemCount, filterFunc)}
            </span>
          </div>
        </td>
      ))}
      <style jsx>{`
        .row {
          text-align: left;
          max-width: 100px;
          margin: auto;
        }
        .key {
          font-weight: bold;
        }
      `}</style>
    </tr>
  ));
};

const ProductOrdersContainer = () => {
  const swr = useSWR(`/order/groupbyproduct`);
  const productOrders: ProductOrderInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <ErrorMsg />;
  }
  if (!productOrders) {
    return <Loader />;
  }
  return (
    <SortableTable
      initialSortData={{
        index: 1,
        isAsc: false,
      }}
      headers={getTableHeaders()}
      data={productOrders}
      emptyMsg="There are no orders"
      body={renderTableBody}
    />
  );
};

export default ProductOrdersContainer;
