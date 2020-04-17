import {
  OrderInterface,
  OrderItemInterface,
  getOrderText,
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
} from "../../src/selectors/order";
import { RequestReducerState } from "../../src/reducers/utils";
import CSSConstants from "../../src/constants/CSSConstants";
import TabSection from "../../src/components/TabSection";
import Link from "next/link";
import ProductCard from "../../src/components/ProductCard";
import { formatPrice } from "../../src/utils/misc";
import moment from "moment";
import SortableTable from "../../src/components/SortableTable";
import LoadingScreen from "../../src/components/LoadingScreen";

interface StateProps {
  orders: OrderInterface[];
  orderItems: OrderItemInterface[];
  openOrderItems: OrderItemInterface[];
  deliveredOrderItems: OrderItemInterface[];
  returnedOrderItems: OrderItemInterface[];
  cancelledOrderItems: OrderItemInterface[];
  getOrdersLoadingState: RequestReducerState;
  currentlyProcessingOrderItemIds: number[];
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
        name: "Action",
        valueFunc: (orderItem: OrderItemInterface) => null,
      },
    ];
  };

  const getActions = (orderItem: OrderItemInterface) => {
    const handleClick = (e, action) => {
      action(orderItem.order.id, orderItem.id);
      e.preventDefault();
    };

    switch (orderItem.orderItemStatus) {
      case OrderStatus.PaymentSuccess:
      case OrderStatus.PaymentOnDelivery:
        return (
          <>
            <a
              className="actionLink success"
              onClick={(e) => handleClick(e, props.markAsShipping)}
            >
              Mark as shipping
            </a>
            <a
              className="actionLink danger"
              onClick={(e) => handleClick(e, props.cancelOrderItem)}
            >
              Cancel Order
            </a>
            <style jsx>{`
              .actionLink {
                margin: 0.4em 0;
                display: block;
              }
              a.actionLink.success {
                color: ${CSSConstants.successColor};
              }
              a.actionLink.danger {
                color: ${CSSConstants.dangerColor};
              }
            `}</style>
          </>
        );
      case OrderStatus.Shipping:
        return (
          <>
            <a
              className="actionLink success"
              onClick={(e) => handleClick(e, props.markAsShippingComplete)}
            >
              Mark as Delivered
            </a>
            <a
              className="actionLink danger"
              onClick={(e) => handleClick(e, props.cancelOrderItem)}
            >
              Cancel Order
            </a>
            <style jsx>{`
              .actionLink {
                margin: 0.4em 0;
                display: block;
              }
              a.actionLink.success {
                color: ${CSSConstants.successColor};
              }
              a.actionLink.danger {
                color: ${CSSConstants.dangerColor};
              }
            `}</style>
          </>
        );
      case OrderStatus.CancelRequested:
        return (
          <>
            <a
              className="actionLink success"
              onClick={(e) => handleClick(e, props.approveCancelOrderItem)}
            >
              Approve Cancel Request
            </a>
            <a
              className="actionLink danger"
              onClick={(e) => handleClick(e, props.rejectCancelOrderItem)}
            >
              Reject Cancel Request
            </a>
            <style jsx>{`
              .actionLink {
                margin: 0.4em 0;
                display: block;
              }
              a.actionLink.success {
                color: ${CSSConstants.successColor};
              }
              a.actionLink.danger {
                color: ${CSSConstants.dangerColor};
              }
            `}</style>
          </>
        );
      case OrderStatus.ReturnRequested:
        return (
          <>
            <a
              className="actionLink success"
              onClick={(e) => handleClick(e, props.approveReturnOrderItem)}
            >
              Approve Return Request
            </a>
            <a
              className="actionLink danger"
              onClick={(e) => handleClick(e, props.rejectReturnOrderItem)}
            >
              Reject Return Request
            </a>
            <style jsx>{`
              .actionLink {
                margin: 0.4em 0;
                display: block;
              }
              a.actionLink.success {
                color: ${CSSConstants.successColor};
              }
              a.actionLink.danger {
                color: ${CSSConstants.dangerColor};
              }
            `}</style>
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
          <td>Boopesh</td>
          <td>
            <div key={orderItem.id} className="productContainer">
              <ProductCard
                name={orderItem.productSnapshot.productName}
                image={orderItem.productSnapshot.images[0]}
                attributeValues={orderItem.productSnapshot.attributeValues}
              />
              <div className="infoGrid">
                <span className="header">Product Id: </span>
                <span className="value">{orderItem.productId}</span>
                <span className="header">Sku Id: </span>
                <span className="value">{orderItem.skuId}</span>
              </div>
            </div>
          </td>
          <td>{formatPrice(orderItem.finalPrice)}</td>
          <td>{orderItem.qty}</td>
          <td>{getOrderText(orderItem.orderItemStatus)}</td>
          <td>
            {moment
              .utc(orderItem.createdDateTime)
              .local()
              .format("MMMM Do YYYY, hh:mm A")}
          </td>
          <td>
            <a>View Details</a>
            {getActions(orderItem)}
          </td>
          <style jsx>{`
            .productContainer {
              text-align: initial;
              margin: 1.2em 0;
            }
            .infoGrid {
              margin: 0.1em;
              display: grid;
              grid-template-columns: repeat(2, auto);
              grid-gap: 0.1em;
            }
            .infoGrid .header {
              font-weight: 700;
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

  const {
    orderItems,
    openOrderItems,
    cancelledOrderItems,
    deliveredOrderItems,
    returnedOrderItems,
  } = props;

  return (
    <div className="container">
      <LoadingScreen />
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
