import useSWR from "swr";
import Loader from "./Loader";
import { ProductOrderInterface, OrderItemCountMap } from "../types/order";
import SortableTable from "./SortableTable";
import ProductCard from "./ProductCard";
import _ from "lodash";
import { isPendingOrderStatus, isShippingOrderStatus } from "../utils/order";
import ErrorMsg from "./ErrorMsg";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getEcosystemFilterForOrder } from "../selectors/order";
import CSSConstants from "../constants/CSSConstants";

const isOpenOrderStatus = (key) =>
  isPendingOrderStatus(key) || isShippingOrderStatus(key);

const getTableHeaders = () => {
  return [
    {
      name: "Product",
      valueFunc: (productOrder: ProductOrderInterface) =>
        productOrder.productId,
    },
    {
      name: "SKU Id",
      valueFunc: (productOrder: ProductOrderInterface) => productOrder.skuId,
    },
    {
      name: "External Id",
      valueFunc: (productOrder: ProductOrderInterface) =>
        productOrder.externalId,
    },
    {
      name: "Pending Orders",
      valueFunc: (productOrder: ProductOrderInterface) =>
        getQty(productOrder.orderItemCount, isPendingOrderStatus),
    },
    {
      name: "Shipping Orders",
      valueFunc: (productOrder: ProductOrderInterface) =>
        getQty(productOrder.orderItemCount, isShippingOrderStatus),
    },
    {
      name: "Total Open Orders",
      valueFunc: (productOrder: ProductOrderInterface) =>
        getQty(productOrder.orderItemCount, isOpenOrderStatus),
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
          ]}
        />
      </td>
      <td>{productOrder.skuId}</td>
      <td>{productOrder.externalId}</td>
      {[isPendingOrderStatus, isShippingOrderStatus, isOpenOrderStatus].map(
        (filterFunc) => (
          <td>
            <div className="qty">
              <span className="key">Qty: </span>
              <span className="value">
                {getQty(productOrder.orderItemCount, filterFunc)}
              </span>
            </div>
            <div className="orderCount">
              (Order Count:{" "}
              {getOrderItemCount(productOrder.orderItemCount, filterFunc)})
            </div>
          </td>
        )
      )}
      <style jsx>{`
        .key {
          font-weight: bold;
        }
        tr {
          font-size: 1rem;
        }
        .qty {
          color: ${CSSConstants.primaryTextColor};
          font-size: 1.1rem;
        }
        .orderCount {
          color: ${CSSConstants.secondaryTextColor};
        }
        .orderCount {
          font-size: 0.8rem;
        }
      `}</style>
    </tr>
  ));
};

interface StateProps {
  selectedEcosystemId: string;
}

type ProductOrdersContainerProps = StateProps;

const ProductOrdersContainer = (props: ProductOrdersContainerProps) => {
  const { selectedEcosystemId } = props;
  const swr = useSWR(
    selectedEcosystemId
      ? `/order/groupbyproduct?ecosystemId=${selectedEcosystemId}`
      : `/order/groupbyproduct`
  );
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

const mapStateToProps = (state: RootState): StateProps => ({
  selectedEcosystemId: getEcosystemFilterForOrder(state),
});

export default connect<StateProps>(mapStateToProps)(ProductOrdersContainer);
