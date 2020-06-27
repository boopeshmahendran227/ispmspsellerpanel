import useSWR from "swr";
import Loader from "./Loader";
import { ProductOrderInterface } from "../types/order";
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
          ]}
        />
      </td>
      <td>
        {_.chain(productOrder.orderItemCount)
          .pickBy((value, key) => isPendingOrderStatus(key))
          .values()
          .sum()
          .value()}
      </td>
      <td>
        {_.chain(productOrder.orderItemCount)
          .pickBy((value, key) => isShippingOrderStatus(key))
          .values()
          .sum()
          .value()}
      </td>
      <td>
        {_.chain(productOrder.orderItemCount)
          .pickBy(
            (value, key) =>
              isPendingOrderStatus(key) || isShippingOrderStatus(key)
          )
          .values()
          .sum()
          .value()}
      </td>
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
