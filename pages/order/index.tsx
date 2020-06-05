import {
  OrderInterface,
  OrderItemInterface,
  OrderStatus,
} from "../../src/types/order";
import OrderActions from "../../src/actions/order";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import {
  getOrders,
  getOpenOrderItems,
  getOrderItems,
  getCancelledOrderItems,
  getCurrentlyProcessingOrderItemIds,
  getDeliveredOrderItems,
  getReturnedOrderItems,
  getOrderPaginatedData,
} from "../../src/selectors/order";
import { RequestReducerState } from "../../src/reducers/utils";
import CSSConstants from "../../src/constants/CSSConstants";
import TabSection from "../../src/components/TabSection";
import Link from "next/link";
import ProductCard from "../../src/components/ProductCard";
import { formatPrice } from "../../src/utils/misc";
import moment from "moment";
import SortableTable from "../../src/components/SortableTable";
import Button, { ButtonType } from "../../src/components/Button";
import { getColor, getOrderStatusText } from "../../src/utils/order";
import Pagination from "../../src/components/Pagination";
import { PaginationDataInterface } from "../../src/types/pagination";

interface StateProps {
  orders: OrderInterface[];
  orderItems: OrderItemInterface[];
  openOrderItems: OrderItemInterface[];
  deliveredOrderItems: OrderItemInterface[];
  returnedOrderItems: OrderItemInterface[];
  cancelledOrderItems: OrderItemInterface[];
  getOrdersLoadingState: RequestReducerState;
  currentlyProcessingOrderItemIds: number[];
  orderPaginationData: PaginationDataInterface;
}

interface DispatchProps {
  getOrders: () => void;
  markAsShippingComplete: (orderId: number, orderItemId: number) => void;
  markAsShipping: (orderId: number, orderItemId: number) => void;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  approveReturnOrderItem: (orderId: number, orderItemId: number) => void;
  rejectReturnOrderItem: (orderId: number, orderItemId: number) => void;
  cancelOrderItem: (orderId: number, orderItemId: number) => void;
  setOrderCurrentPageNumber: (value: number) => void;
}

type OrdersProps = StateProps & DispatchProps;

const Orders = (props: OrdersProps) => {
  const getTableHeaders = () => {
    return [
      {
        name: "Order Id",
        valueFunc: (orderItem: OrderItemInterface) => orderItem.id,
      },
      {
        name: "Item Id",
        valueFunc: (orderItem: OrderItemInterface) => orderItem.id,
      },
      {
        name: "Customer",
        valueFunc: (orderItem: OrderItemInterface) => null,
      },
      {
        name: "Product",
        valueFunc: (orderItem: OrderItemInterface) => null,
      },
      {
        name: "Price",
        valueFunc: (orderItem: OrderItemInterface) => orderItem.discountedPrice,
      },
      {
        name: "Qty",
        valueFunc: (orderItem: OrderItemInterface) => orderItem.qty,
      },
      {
        name: "Status",
        valueFunc: (orderItem: OrderItemInterface) => orderItem.orderItemStatus,
      },
      {
        name: "Created",
        valueFunc: (orderItem: OrderItemInterface) => orderItem.createdDateTime,
      },
      {
        name: "Actions",
        valueFunc: (orderItem: OrderItemInterface) => null,
      },
    ];
  };

  const getButtons = (orderItem: OrderItemInterface) => {
    const handleClick = (e, action) => {
      action(orderItem.order.id, orderItem.id);
      e.preventDefault();
    };

    switch (orderItem.orderItemStatus) {
      case OrderStatus.PaymentSuccess:
      case OrderStatus.PaymentOnDelivery:
        return (
          <>
            <Button
              type={ButtonType.success}
              onClick={(e) => handleClick(e, props.markAsShipping)}
            >
              Mark as Shipping
            </Button>
            <Button
              type={ButtonType.danger}
              onClick={(e) => handleClick(e, props.cancelOrderItem)}
              outlined={true}
            >
              Cancel Order
            </Button>
          </>
        );
      case OrderStatus.PackageReadyForCollection:
        return (
          <>
            <Button
              type={ButtonType.success}
              onClick={(e) => handleClick(e, props.markAsShippingComplete)}
            >
              Mark as Delivered & Cash Received
            </Button>
            <Button
              type={ButtonType.danger}
              onClick={(e) => handleClick(e, props.cancelOrderItem)}
              outlined={true}
            >
              Cancel Order
            </Button>
          </>
        );
      case OrderStatus.Shipping:
        return (
          <>
            <Button
              type={ButtonType.success}
              onClick={(e) => handleClick(e, props.markAsShippingComplete)}
            >
              Mark as Delivered
            </Button>
            <Button
              onClick={(e) => handleClick(e, props.cancelOrderItem)}
              type={ButtonType.danger}
              outlined={true}
            >
              Cancel Order
            </Button>
          </>
        );
      case OrderStatus.CancelRequested:
        return (
          <>
            <Button
              onClick={(e) => handleClick(e, props.approveCancelOrderItem)}
              type={ButtonType.success}
            >
              Approve Cancel Request
            </Button>
            <Button
              onClick={(e) => handleClick(e, props.rejectCancelOrderItem)}
              outlined={true}
              type={ButtonType.danger}
            >
              Reject Cancel Request
            </Button>
          </>
        );
      case OrderStatus.ReturnRequested:
        return (
          <>
            <Button
              onClick={(e) => handleClick(e, props.approveReturnOrderItem)}
              type={ButtonType.success}
            >
              Approve Return Request
            </Button>
            <Button
              onClick={(e) => handleClick(e, props.rejectReturnOrderItem)}
              type={ButtonType.danger}
              outlined={true}
            >
              Reject Return Request
            </Button>
          </>
        );
    }
    return null;
  };

  const renderTableBody = (orderItems: OrderItemInterface[]) => {
    return orderItems.map((orderItem) => (
      <Link
        key={orderItem.id}
        href="/order/[orderId]/[orderItemId]"
        as={`/order/${orderItem.order.id}/${orderItem.id}`}
      >
        <tr>
          <td>{orderItem.order.id}</td>
          <td>{orderItem.id}</td>
          <td>{orderItem.order.customerId}</td>
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
                ]}
              />
            </div>
          </td>
          <td>{formatPrice(orderItem.finalPrice)}</td>
          <td>{orderItem.qty}</td>
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
              .format("MMMM Do YYYY, hh:mm A")}
          </td>
          <td className="actions">{getButtons(orderItem)}</td>
          <style jsx>{`
            .productContainer {
              text-align: initial;
              margin: 1.2em 0;
            }
            tr:hover {
              background-color: ${CSSConstants.hoverColor} !important;
              cursor: pointer;
            }
            .actions {
              font-size: 0.9rem;
            }
          `}</style>
        </tr>
      </Link>
    ));
  };

  const {
    orderItems,
    openOrderItems,
    cancelledOrderItems,
    deliveredOrderItems,
    returnedOrderItems,
  } = props;

  return (
    <div className="container">
      <TabSection
        headingList={[
          `All Orders (${orderItems.length})`,
          `Open Orders (${openOrderItems.length})`,
          `Delivered Orders (${deliveredOrderItems.length})`,
          `Cancelled Orders (${cancelledOrderItems.length})`,
          `Returned Orders (${returnedOrderItems.length})`,
        ]}
        contentList={[
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={orderItems}
            emptyMsg="There are no orders"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={openOrderItems}
            emptyMsg="There are no open orders"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={deliveredOrderItems}
            emptyMsg="There are no delivered orders"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={cancelledOrderItems}
            emptyMsg="There are no cancelled orders"
            body={renderTableBody}
          />,
          <SortableTable
            initialSortData={{
              index: 1,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={returnedOrderItems}
            emptyMsg="There are no returned orders"
            body={renderTableBody}
          />,
        ]}
      />
      <Pagination
        data={props.orderPaginationData}
        onChange={props.setOrderCurrentPageNumber}
      />
      <style jsx>{`
        .container {
          padding: 1em 0;
          margin: 1em auto;
          font-size: 0.9rem;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        @media (max-width: 800px) {
          .container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  orders: getOrders(state),
  orderItems: getOrderItems(state),
  openOrderItems: getOpenOrderItems(state),
  cancelledOrderItems: getCancelledOrderItems(state),
  deliveredOrderItems: getDeliveredOrderItems(state),
  returnedOrderItems: getReturnedOrderItems(state),
  getOrdersLoadingState: state.order.order,
  currentlyProcessingOrderItemIds: getCurrentlyProcessingOrderItemIds(state),
  orderPaginationData: getOrderPaginatedData(state),
});

const mapDispatchToProps: DispatchProps = {
  getOrders: OrderActions.getOrders,
  markAsShippingComplete: OrderActions.markAsShippingComplete,
  markAsShipping: OrderActions.markAsShipping,
  approveCancelOrderItem: OrderActions.approveCancelOrderItem,
  rejectCancelOrderItem: OrderActions.rejectCancelOrderItem,
  approveReturnOrderItem: OrderActions.approveReturnOrderItem,
  rejectReturnOrderItem: OrderActions.rejectReturnOrderItem,
  cancelOrderItem: OrderActions.cancelOrderItem,
  setOrderCurrentPageNumber: OrderActions.setOrderCurrentPageNumber,
};

const mapPropsToLoadData = (props: OrdersProps) => {
  return [
    {
      data: props.orders,
      fetch: props.getOrders,
      loadingState: props.getOrdersLoadingState,
    },
  ];
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(Orders));
