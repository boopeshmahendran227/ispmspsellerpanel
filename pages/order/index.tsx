import {
  OrderInterface,
  OrderItemInterface,
  OrderStatus,
} from "../../src/types/order";
import OrderActions from "../../src/actions/order";
import { connect } from "react-redux";
import CSSConstants from "../../src/constants/CSSConstants";
import TabSection from "../../src/components/TabSection";
import Select from "../../src/components/Select";
import Link from "next/link";
import ProductCard from "../../src/components/ProductCard";
import { formatPrice } from "../../src/utils/misc";
import moment from "moment";
import SortableTable from "../../src/components/SortableTable";
import Button, { ButtonType } from "../../src/components/Button";
import {
  getColor,
  getOrderStatusText,
  getPaymentText,
  getPaymentModeColor,
  isCancelledOrderStatus,
  isReturnedOrderStatus,
  isOpenOrderStatus,
  isDeliveredOrderStatus,
} from "../../src/utils/order";
import Pagination from "../../src/components/Pagination";
import { PaginationDataInterface } from "../../src/types/pagination";
import { getCustomerInfo } from "../../src/utils/customer";
import PageHeader from "../../src/components/PageHeader";
import ProductOrdersContainer from "../../src/components/ProductOrdersContainer";
import { SelectOptionInterface } from "../../src/types/product";
import useSWR from "swr";
import { BusinessDataInterface } from "../../src/types/business";
import PageError from "../../src/components/PageError";
import Loader from "../../src/components/Loader";
import EcosystemOption from "../../src/components/EcosystemOption";
import WithAuth from "../../src/components/WithAuth";
import { useState } from "react";
import { transformOrderItem } from "../../src/transformers/orderItem";
import _ from "lodash";

interface DispatchProps {
  markAsShippingComplete: (orderId: number, orderItemId: number) => void;
  markAsShipping: (orderId: number, orderItemId: number) => void;
  markAsProcessing: (orderId: number, orderItemId: number) => void;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  approveReturnOrderItem: (orderId: number, orderItemId: number) => void;
  rejectReturnOrderItem: (orderId: number, orderItemId: number) => void;
  cancelOrderItem: (orderId: number, orderItemId: number) => void;
  setOrderCurrentPageNumber: (value: number) => void;
  setEcosystemFilter: (ecosystemId: string) => void;
}

type OrdersProps = DispatchProps;

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
        name: "Payment",
        valueFunc: (orderItem: OrderItemInterface) =>
          orderItem.order.paymentSplits[0].paymentMode,
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

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedEcosystemId, setSelectedEcosystemId] = useState(null);
  const orderSWR = useSWR(
    `/order?pageNumber=${currentPageNumber}&ecosystemids=${selectedEcosystemId}`
  );

  const orderData: PaginationDataInterface<OrderInterface> = orderSWR.data;

  const businessSWR = useSWR("/businesses/business");
  const businessData: BusinessDataInterface = businessSWR.data;
  const error = businessSWR.error || orderSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!businessData || !orderData) {
    return <Loader />;
  }

  const orders: OrderInterface[] = orderData.results;

  const orderItems: OrderItemInterface[] = _.chain(orders)
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

  const ecosystems: SelectOptionInterface[] = [
    {
      value: null,
      label: "All Ecosystems",
    },
    ...businessData.ecosystems.map((ecosystem) => ({
      value: ecosystem.ecosystem_id._id,
      label: <EcosystemOption ecosystem={ecosystem} />,
    })),
  ];

  const currentEcosystem = ecosystems.find(
    (ecosystem) => ecosystem.value === selectedEcosystemId
  );

  return (
    <div className="container">
      <div className="headerContainer">
        <PageHeader>Orders</PageHeader>
        <div className="filterContainer">
          <Select
            value={currentEcosystem}
            onChange={(ecosystem) =>
              setSelectedEcosystemId(ecosystem.value as string)
            }
            options={ecosystems}
          />
        </div>
      </div>
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
          <ProductOrdersContainer selectedEcosystemId={selectedEcosystemId} />,
        ]}
      />
      <Pagination data={orderData} onChange={setCurrentPageNumber} />
      <style jsx>{`
        .container {
          padding: 1em 0;
          margin: 1em auto;
          font-size: 0.9rem;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        .headerContainer {
          padding: 0.6em 1.3em;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .filterContainer {
          min-width: 300px;
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

const mapDispatchToProps: DispatchProps = {
  markAsShippingComplete: OrderActions.markAsShippingComplete,
  markAsShipping: OrderActions.markAsShipping,
  markAsProcessing: OrderActions.markAsProcessing,
  approveCancelOrderItem: OrderActions.approveCancelOrderItem,
  rejectCancelOrderItem: OrderActions.rejectCancelOrderItem,
  approveReturnOrderItem: OrderActions.approveReturnOrderItem,
  rejectReturnOrderItem: OrderActions.rejectReturnOrderItem,
  cancelOrderItem: OrderActions.cancelOrderItem,
  setOrderCurrentPageNumber: OrderActions.setOrderCurrentPageNumber,
  setEcosystemFilter: OrderActions.setEcosystemFilter,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Orders)
);
