import {
  ManufactureMetadata,
  OrderInterface,
  OrderStatus,
  OrderStatusFilter,
  OrderType,
  TransformedOrderItemInterface,
} from "types/order";
import OrderActions from "actions/order";
import { connect } from "react-redux";
import CSSConstants from "../../constants/CSSConstants";
import TabSection from "components/atoms/TabSection";
import Link from "next/link";
import ProductCard from "components/atoms/ProductCard";
import { formatPrice } from "utils/misc";
import moment from "moment";
import SortableTable from "components/atoms/SortableTable";
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
import ProductOrdersContainer from "components/molecules/ProductOrdersContainer";
import Loader from "components/atoms/Loader";
import { transformOrderItem } from "../../transformers/orderItem";
import _ from "lodash";
import { Box, Flex } from "@chakra-ui/core";
import Button from "components/atoms/Button";
import MobileMediaQuery from "components/atoms/MobileMediaQuery";
import DesktopMediaQuery from "components/atoms/DesktopMediaQuery";
import Select from "components/atoms/Select";
import React, { useState } from "react";
import { SelectOptionInterface } from "types/product";
import MobileOrderProductCard from "components/atoms/MobileOrderProductCard";
import ManufactureOrderData from "./ManufactureOrderData";

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

const statusFilters: SelectOptionInterface[] = [
  {
    value: OrderStatusFilter.AllOrderItems,
    label: "All Orders",
  },
  {
    value: OrderStatusFilter.OpenOrderItems,
    label: "Open Orders",
  },
  {
    value: OrderStatusFilter.DeliveredOrderItems,
    label: "Delivered Orders",
  },
  {
    value: OrderStatusFilter.CancelledOrderItems,
    label: "Cancelled Orders ",
  },
  {
    value: OrderStatusFilter.ReturnedOrderItems,
    label: "returned Orders",
  },
];

const OrdersContainer = (props: OrdersContainerProps) => {
  const [filter, setFilter] = useState(statusFilters[0]);

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
          <Flex w="full" direction={["row", null, null, "column"]}>
            <Box mr={2} mb={2} flex={1}>
              <Button
                w="full"
                variantColor="successColorVariant"
                onClick={(e) => handleClick(e, props.markAsProcessing)}
              >
                Mark as Processing
              </Button>
            </Box>
            <Box flex={1} mb={2}>
              <Button
                w="full"
                variantColor="dangerColorVariant"
                variant="outline"
                onClick={(e) => handleClick(e, props.cancelOrderItem)}
              >
                Cancel Order
              </Button>
            </Box>
          </Flex>
        );
      case OrderStatus.SellerProcessing:
        if (orderItem.isSelfPickup) {
          return (
            <Flex
              w="full"
              direction={["row", null, null, "column"]}
              wrap="wrap"
            >
              <Box mr={2} mb={2} flex={1}>
                <Button
                  w="full"
                  variantColor="successColorVariant"
                  onClick={(e) =>
                    handleClick(e, props.markPackageReadyForCollection)
                  }
                >
                  Mark Package Ready For Collection
                </Button>
              </Box>
              <Box flex={1}>
                <Button
                  w="full"
                  variantColor="dangerColorVariant"
                  variant="outline"
                  onClick={(e) => handleClick(e, props.cancelOrderItem)}
                >
                  Cancel Order
                </Button>
              </Box>
            </Flex>
          );
        }
        return (
          <Flex w="full" direction={["row", null, null, "column"]}>
            <Box mr={2} mb={2} flex={1}>
              <Button
                w="full"
                variantColor="successColorVariant"
                onClick={(e) => handleClick(e, props.markAsShipping)}
              >
                Mark as Shipping
              </Button>
            </Box>
            <Box flex={1}>
              <Button
                w="full"
                variantColor="dangerColorVariant"
                variant="outline"
                onClick={(e) => handleClick(e, props.cancelOrderItem)}
              >
                Cancel Order
              </Button>
            </Box>
          </Flex>
        );
      case OrderStatus.PackageReadyForCollection:
        return (
          <Flex w="full" direction={["row", null, null, "column"]} wrap="wrap">
            <Box mr={2} mb={2} flex={1}>
              <Button
                w="full"
                variantColor="successColorVariant"
                onClick={(e) => handleClick(e, props.markAsShippingComplete)}
              >
                Mark as Delivered & Cash Received
              </Button>
            </Box>
            <Box flex={1}>
              <Button
                w="full"
                variantColor="dangerColorVariant"
                variant="outline"
                onClick={(e) => handleClick(e, props.cancelOrderItem)}
              >
                Cancel Order
              </Button>
            </Box>
          </Flex>
        );
      case OrderStatus.Shipping:
        return (
          <Flex w="full" direction={["row", null, null, "column"]} wrap="wrap">
            <Box mr={2} mb={2} flex={1}>
              <Button
                w="full"
                variantColor="successColorVariant"
                onClick={(e) => handleClick(e, props.markAsShippingComplete)}
              >
                Mark as Delivered
              </Button>
            </Box>
            <Box flex={1}>
              <Button
                w="full"
                onClick={(e) => handleClick(e, props.cancelOrderItem)}
                variantColor="dangerColorVariant"
                variant="outline"
              >
                Cancel Order
              </Button>
            </Box>
          </Flex>
        );
      case OrderStatus.CancelRequested:
        return (
          <Flex w="full" direction={["row", null, null, "column"]} wrap="wrap">
            <Box mr={2} mb={2} flex={1}>
              <Button
                w="full"
                onClick={(e) => handleClick(e, props.approveCancelOrderItem)}
                variantColor="successColorVariant"
              >
                Approve Cancel Request
              </Button>
            </Box>
            <Box flex={1}>
              <Button
                w="full"
                onClick={(e) => handleClick(e, props.rejectCancelOrderItem)}
                variantColor="dangerColorVariant"
                variant="outline"
              >
                Reject Cancel Request
              </Button>
            </Box>
          </Flex>
        );
      case OrderStatus.ReturnRequested:
        return (
          <Flex w="full" direction={["row", null, null, "column"]}>
            <Box mr={[0, null, null, 2]} mb={2} flex={1}>
              <Button
                w="full"
                onClick={(e) => handleClick(e, props.approveReturnOrderItem)}
                variantColor="successColorVariant"
              >
                Approve Return Request
              </Button>
            </Box>
            <Box flex={1}>
              <Button
                w="full"
                onClick={(e) => handleClick(e, props.rejectReturnOrderItem)}
                variantColor="dangerColorVariant"
                variant="outline"
              >
                Reject Return Request
              </Button>
            </Box>
          </Flex>
        );
    }
    return null;
  };

  const renderTableBody = (orderItems: TransformedOrderItemInterface[]) => {
    return orderItems.map((orderItem) => {
      return (
        <>
          <Link
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
          {orderItem.metadata?.manufactureMetadata &&
            orderItem.metadata?.manufactureMetadata.payment.length !== 0 && (
              <tr>
                <td colSpan={10}>
                  <ManufactureOrderData
                    manufactureMetadata={
                      orderItem.metadata?.manufactureMetadata
                    }
                  />
                </td>
              </tr>
            )}
        </>
      );
    });
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

  const getTableData = (filter) => {
    switch (filter) {
      case OrderStatusFilter.AllOrderItems:
        return orderItems;
      case OrderStatusFilter.CancelledOrderItems:
        return cancelledOrderItems;
      case OrderStatusFilter.OpenOrderItems:
        return openOrderItems;
      case OrderStatusFilter.DeliveredOrderItems:
        return deliveredOrderItems;
      case OrderStatusFilter.ReturnedOrderItems:
        return returnedOrderItems;
    }
    return orderItems;
  };

  return (
    <>
      <MobileMediaQuery>
        <Box maxW="250px" mb={2} p={2}>
          <Select
            value={filter}
            options={statusFilters}
            onChange={(value) => setFilter(value)}
          />
          <Box mt={4} fontWeight="bold">
            {`Total ${filter.label}(${getTableData(filter.value).length})`}
          </Box>
        </Box>
        {getTableData(filter.value).map((orderItem) => (
          <Link
            key={orderItem.id}
            href="/order/[orderId]/[orderItemId]"
            as={`/order/${orderItem.order.id}/${orderItem.id}`}
          >
            <Box>
              <MobileOrderProductCard
                productImage={orderItem.productSnapshot.images[0]}
                productName={orderItem.productSnapshot.productName}
                orderId={orderItem.order.id}
                orderItemId={orderItem.id}
                createdDateTime={moment
                  .utc(orderItem.createdDateTime)
                  .local()
                  .format("Do MMM YYYY")}
                orderItemStatus={orderItem.orderItemStatus}
                skuId={orderItem.skuId}
                price={formatPrice(orderItem.discountedPrice)}
                qty={orderItem.qty}
                buttons={getButtons(orderItem)}
                orderType={orderItem.order.orderType}
                manufactureMetadata={orderItem.metadata?.manufactureMetadata}
              />
            </Box>
          </Link>
        ))}
      </MobileMediaQuery>
      <DesktopMediaQuery>
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
      </DesktopMediaQuery>
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
