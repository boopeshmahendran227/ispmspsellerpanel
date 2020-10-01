import {
  OrderInterface,
  OrderStatus,
  TransformedOrderItemInterface,
} from "types/order";
import OrderActions from "actions/order";
import { connect } from "react-redux";
import CSSConstants from "../../src/constants/CSSConstants";
import TabSection from "components/TabSection";
import Link from "next/link";
import ProductCard from "components/molecules/ProductCard";
import { formatPrice } from "utils/misc";
import moment from "moment";
import SortableTable from "components/SortableTable";
import Button, { ButtonType } from "./atoms/Button";
import {
  getColor,
  getOrderStatusText,
  getPaymentText,
  getPaymentModeColor,
  isCancelledOrderStatus,
  isReturnedOrderStatus,
  isOpenOrderStatus,
  isDeliveredOrderStatus,
} from "utils/order";
import Pagination from "components/atoms/Pagination";
import { PaginatedDataInterface } from "types/pagination";
import { getCustomerInfo } from "utils/customer";
import ProductOrdersContainer from "components/ProductOrdersContainer";
import Loader from "components/atoms/Loader";
import { transformOrderItem } from "../../src/transformers/orderItem";
import _ from "lodash";

interface OwnProps {
  orderData: PaginatedDataInterface<OrderInterface>;
  selectedEcosystemId: string;
  setCurrentPageNumber: (pageNumber: number) => void;
}

interface DispatchProps {
  markAsShippingComplete: (orderId: number, orderItemId: number) => void;
  markAsShipping: (orderId: number, orderItemId: number) => void;
  markAsProcessing: (orderId: number, orderItemId: number) => void;
  markPackageReadyForCollection: (orderId: number, orderItemId: number) => void;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  approveReturnOrderItem: (orderId: number, orderItemId: number) => void;
  rejectReturnOrderItem: (orderId: number, orderItemId: number) => void;
  cancelOrderItem: (orderId: number, orderItemId: number) => void;
}

type OrdersContainerProps = OwnProps & DispatchProps;

const OrdersContainer = (props: OrdersContainerProps) => {
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
        name: "Created",
        valueFunc: (orderItem: TransformedOrderItemInterface) =>
          orderItem.createdDateTime,
      },
      {
        name: "Actions",
        valueFunc: (orderItem: TransformedOrderItemInterface) => null,
      },
    ];
  };

  const getButtons = (orderItem: TransformedOrderItemInterface) => {
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
              onClick={(e) => handleClick(e, props.markAsProcessing)}
            >
              Mark as Processing
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
      case OrderStatus.SellerProcessing:
        if (orderItem.isSelfPickup) {
          return (
            <>
              <Button
                type={ButtonType.success}
                onClick={(e) =>
                  handleClick(e, props.markPackageReadyForCollection)
                }
              >
                Mark Package Ready For Collection
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
        }
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

  const orderData: PaginatedDataInterface<OrderInterface> = props.orderData;

  if (!orderData) {
    return <Loader />;
  }

  const orders: OrderInterface[] = orderData.results;

  const orderItems: TransformedOrderItemInterface[] = _.chain(orders)
    .map((order) =>
      order.items.map((orderItem) => transformOrderItem(order, orderItem))
    )
    .flatten()
    .value();

  const openOrderItems = orderItems.filter((orderItem) =>
    isOpenOrderStatus(orderItem.orderItemStatus)
  );

  const deliveredOrderItems = orderItems.filter((orderItem) =>
    isDeliveredOrderStatus(orderItem.orderItemStatus)
  );

  const cancelledOrderItems = orderItems.filter((orderItem) =>
    isCancelledOrderStatus(orderItem.orderItemStatus)
  );

  const returnedOrderItems = orderItems.filter((orderItem) =>
    isReturnedOrderStatus(orderItem.orderItemStatus)
  );

  return (
    <>
      <TabSection
        headingList={[
          `All Orders (${orderItems.length})`,
          `Open Orders (${openOrderItems.length})`,
          `Delivered Orders (${deliveredOrderItems.length})`,
          `Cancelled Orders (${cancelledOrderItems.length})`,
          `Returned Orders (${returnedOrderItems.length})`,
          `Orders By Products`,
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
          <ProductOrdersContainer
            selectedEcosystemId={props.selectedEcosystemId}
          />,
        ]}
      />
      <Pagination data={orderData} onChange={props.setCurrentPageNumber} />
    </>
  );
};

const mapDispatchToProps: DispatchProps = {
  markAsShippingComplete: OrderActions.markAsShippingComplete,
  markAsShipping: OrderActions.markAsShipping,
  markPackageReadyForCollection: OrderActions.markPackageReadyForCollection,
  markAsProcessing: OrderActions.markAsProcessing,
  approveCancelOrderItem: OrderActions.approveCancelOrderItem,
  rejectCancelOrderItem: OrderActions.rejectCancelOrderItem,
  approveReturnOrderItem: OrderActions.approveReturnOrderItem,
  rejectReturnOrderItem: OrderActions.rejectReturnOrderItem,
  cancelOrderItem: OrderActions.cancelOrderItem,
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(OrdersContainer);
