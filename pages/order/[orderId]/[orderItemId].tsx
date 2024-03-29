import moment from "moment";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "components/atoms/Loader";
import OrderItemDetail from "components/molecules/OrderItemDetail";
import { formatAddress } from "utils/misc";
import { connect } from "react-redux";
import OrderActions from "actions/order";
import {
  ManufactureMetadata,
  OrderDetailInterface,
  OrderType,
  TransformedOrderItemInterface,
} from "types/order";
import {
  getOrderStatusText,
  getPaymentText,
  getPaymentModeColor,
} from "utils/order";
import PageError from "components/atoms/PageError";
import ShippingInformationContainer from "components/molecules/ShippingInformationContainer";
import OrderInformation from "components/molecules/OrderInformation";
import WithAuth from "components/atoms/WithAuth";
import DeliveryCodeModal from "components/molecules/DeliveryCodeModal";
import { transformOrderItem } from "../../../src/transformers/orderItem";
import BackLink from "components/atoms/BackLink";
import { Box, Heading, Grid, Divider, Stack, Tag, Flex } from "@chakra-ui/core";
import Button from "components/atoms/Button";
import ManufactureOrderData from "components/molecules/ManufactureOrderData";

interface DispatchProps {
  markAsShippingComplete: (orderId: number, orderItemId: number) => void;
  markAsShipping: (orderId: number, orderItemId: number) => void;
  markPackageReadyForCollection: (orderId: number, orderItemId: number) => void;
  markAsProcessing: (orderId: number, orderItemId: number) => void;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  approveReturnOrderItem: (orderId: number, orderItemId: number) => void;
  rejectReturnOrderItem: (orderId: number, orderItemId: number) => void;
  cancelOrderItem: (orderId: number, orderItemId: number) => void;
}

const Name = (props) => (
  <Box fontWeight="bold" py={1} px={3} mt={1}>
    {props.children}
  </Box>
);

const Value = (props) => <Box px={3}>{props.children}</Box>;

type OrderProps = DispatchProps;

const Order = (props: OrderProps) => {
  const router = useRouter();
  const swr = useSWR(`/order/${router.query.orderId}`);
  const order: OrderDetailInterface = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!order) {
    return <Loader />;
  }

  const item = order.items.find(
    (orderItem) => orderItem.id === Number(router.query.orderItemId)
  );

  if (!item) {
    return <PageError statusCode={404} />;
  }

  const orderItem: TransformedOrderItemInterface = transformOrderItem(
    order,
    item
  );

  return (
    <Box
      my={6}
      mx={[2, "auto"]}
      maxW={["800px", null, "700px", "800px", "1100px"]}
    >
      <DeliveryCodeModal />
      <BackLink href="/order">Back to Orders</BackLink>
      <Flex my={3} align="baseline" direction={["column", "row"]}>
        <Heading size="md" mx={2}>
          <Box as="span">
            #{order.id}-{orderItem.id}
          </Box>
          <Box
            as="span"
            fontSize={["sm", "md"]}
            color="secondaryTextColor.500"
            fontWeight="normal"
          >
            {moment
              .utc(order.createdDateTime)
              .local()
              .format("MMMM Do YYYY h:mm a")}
          </Box>{" "}
        </Heading>
        <Box>
          <Tag
            m={2}
            size="sm"
            variant="solid"
            rounded="full"
            variantColor="primaryColorVariant"
          >
            {getOrderStatusText(orderItem.orderItemStatus)}
          </Tag>
          <Tag
            m={2}
            variant="solid"
            size={"sm"}
            rounded="full"
            variantColor={getPaymentModeColor(
              orderItem.order.paymentSplits[0].paymentMode
            )}
          >
            {getPaymentText(orderItem.order.paymentSplits[0].paymentMode)}
          </Tag>
        </Box>
      </Flex>
      <Box my={2}>
        <Button onClick={() => window.open(`/invoice/${orderItem.id}`)}>
          View Invoice
        </Button>
      </Box>
      <Grid templateColumns={["1fr", null, null, "1fr 300px"]} gap={4}>
        <Box flex="1">
          <OrderItemDetail
            orderItem={orderItem}
            markAsShipping={props.markAsShipping}
            markAsShippingComplete={props.markAsShippingComplete}
            markPackageReadyForCollection={props.markPackageReadyForCollection}
            markAsProcessing={props.markAsProcessing}
            approveCancelOrderItem={props.approveCancelOrderItem}
            rejectCancelOrderItem={props.rejectCancelOrderItem}
            approveReturnOrderItem={props.approveReturnOrderItem}
            rejectReturnOrderItem={props.rejectReturnOrderItem}
            cancelOrderItem={props.cancelOrderItem}
          />
          {order.orderType === OrderType.Manufacturing &&
            orderItem.metadata.manufactureMetadata &&
            orderItem.metadata?.manufactureMetadata.payment.length !== 0 && (
              <Box
                bg="white"
                borderWidth="1px"
                borderColor="borderColor.500"
                my={5}
              >
                <ManufactureOrderData
                  manufactureMetadata={orderItem.metadata.manufactureMetadata}
                />
              </Box>
            )}
          <Box>
            <ShippingInformationContainer orderItem={orderItem} />
          </Box>
        </Box>
        <Stack spacing={8} fontSize={["sm", "md"]} pb={2}>
          <Box
            bg="foregroundColor.500"
            border="1px"
            borderColor="borderColor.500"
            pb={3}
          >
            <Box fontSize="lg" fontWeight="bold" my={3} mx={3}>
              Customer Information
            </Box>
            <Name>Name</Name>
            <Value>{order.customerName || "Name Not Available"}</Value>
            <Divider />
            {Boolean(order.customerPhone) && (
              <>
                <Name>Phone</Name>
                <Value>{order.customerPhone}</Value>
                <Divider />
              </>
            )}
            <Name>Billing Address</Name>
            <Value>{formatAddress(order.billingAddress)}</Value>
            <Divider />
            <Name>Shipping Address</Name>
            <Value>{formatAddress(order.shippingAddress)}</Value>
          </Box>
          <Box>
            <OrderInformation order={order} />
          </Box>
        </Stack>
      </Grid>
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  markAsShippingComplete: OrderActions.markAsShippingComplete,
  markAsShipping: OrderActions.markAsShipping,
  markPackageReadyForCollection: OrderActions.markPackageReadyForCollection,
  approveCancelOrderItem: OrderActions.approveCancelOrderItem,
  rejectCancelOrderItem: OrderActions.rejectCancelOrderItem,
  approveReturnOrderItem: OrderActions.approveReturnOrderItem,
  rejectReturnOrderItem: OrderActions.rejectReturnOrderItem,
  cancelOrderItem: OrderActions.cancelOrderItem,
  markAsProcessing: OrderActions.markAsProcessing,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Order)
);
