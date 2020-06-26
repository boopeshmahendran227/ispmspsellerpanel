import Modal from "./Modal";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { getProductOrdersModalOpen } from "../selectors/ui";
import UIActions from "../actions/ui";
import useSWR from "swr";
import Loader from "./Loader";
import { ProductOrderInterface } from "../types/order";
import SortableTable from "./SortableTable";
import ProductCard from "./ProductCard";
import _ from "lodash";
import {
  isOpenOrderStatus,
  isDeliveredOrderStatus,
  isCancelledOrderStatus,
  isReturnedOrderStatus,
} from "../utils/order";
import ErrorMsg from "./ErrorMsg";

const getTableHeaders = () => {
  return [
    {
      name: "Product",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
    {
      name: "Open Orders",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
    {
      name: "Delivered Orders",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
    {
      name: "Cancelled Orders",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
    {
      name: "Returned Orders",
      valueFunc: (productOrder: ProductOrderInterface) => null,
    },
    {
      name: "Total Orders",
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
          .pickBy((value, key) => isOpenOrderStatus(key))
          .values()
          .sum()
          .value()}
      </td>
      <td>
        {_.chain(productOrder.orderItemCount)
          .pickBy((value, key) => isDeliveredOrderStatus(key))
          .values()
          .sum()
          .value()}
      </td>
      <td>
        {_.chain(productOrder.orderItemCount)
          .pickBy((value, key) => isCancelledOrderStatus(key))
          .values()
          .sum()
          .value()}
      </td>
      <td>
        {_.chain(productOrder.orderItemCount)
          .pickBy((value, key) => isReturnedOrderStatus(key))
          .values()
          .sum()
          .value()}
      </td>
      <td>{_.chain(productOrder.orderItemCount).values().sum().value()}</td>
      <style jsx>{`
        .productContainer {
          text-align: initial;
          margin: 1.2em 0;
        }
        .couponProduct {
          margin: 0.5em;
        }
      `}</style>
    </tr>
  ));
};

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  onClose: () => void;
}

type ProductOrdersModalProps = StateProps & DispatchProps;

const getModalBody = (productOrders, error) => {
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

const ProductOrdersModal = (props: ProductOrdersModalProps) => {
  const swr = useSWR(`/order/groupbyproduct`);
  const productOrders: ProductOrderInterface[] = swr.data;
  const error = swr.error;

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className="container">
        <header>Orders By Product</header>
        {getModalBody(productOrders, error)}
      </div>
      <style jsx>{`
        header {
          margin: 1em 0;
          font-weight: bold;
          font-size: 1.3rem;
          text-transform: uppercase;
        }
        .subHeader {
          font-weight: 500;
          font-size: 1.1rem;
          margin: 0.8em 0;
        }
        .container {
          margin: 1em;
          min-width: 270px;
        }
      `}</style>
    </Modal>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  open: getProductOrdersModalOpen(state),
});

const mapDispatchToProps: DispatchProps = {
  onClose: UIActions.hideProductOrdersModal,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ProductOrdersModal);
