import moment from "moment";
import CSSConstants from "../../../src/constants/CSSConstants";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "components/atoms/Loader";
import OrderItemDetail from "components/molecules/OrderItemDetail";
import { formatAddress } from "utils/misc";
import { connect } from "react-redux";
import OrderActions from "actions/order";
import {
  OrderDetailInterface,
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
import {
  Box,
  Heading,
  Grid,
  Divider,
  Stack,
  Tag,
  Button,
} from "@chakra-ui/core";

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
  <Box fontWeight="bold" p="0.4em 0.8em" mt="0.4em">
    {props.children}
  </Box>
);

const Value = (props) => <Box p="0.4em 0.8em">{props.children}</Box>;

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
    <Box my="1em" mx="auto" maxW="1100px">
      <DeliveryCodeModal />
      <BackLink href="/order">Back to Orders</BackLink>
      <Stack isInline spacing={3} m="1em 0">
        <Heading size="lg">
          <Box as="span">
            #{order.id}-{orderItem.id}
          </Box>
          <Box
            as="span"
            fontSize="md"
            color="secondaryTextColor"
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
            variant="solid"
            rounded="full"
            size="md"
            variantColor="primaryColorVariant"
          >
            {getOrderStatusText(orderItem.orderItemStatus)}
          </Tag>
        </Box>
        <Tag
          variant="solid"
          rounded="full"
          size="md"
          variantColor={getPaymentModeColor(
            orderItem.order.paymentSplits[0].paymentMode
          )}
        >
          {getPaymentText(orderItem.order.paymentSplits[0].paymentMode)}
        </Tag>
      </Stack>
      <Button
        m="0.5rem 0"
        variantColor="primaryColorVariant"
        size="md"
        onClick={() => window.open(`/invoice/${orderItem.id}`)}
      >
        View Invoice
      </Button>
      <Grid templateColumns="1fr 300px" gap="1em">
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
          <Box>
            <ShippingInformationContainer orderItem={orderItem} />
          </Box>
        </Box>
        <Stack spacing={4}>
          <Box bg="foregroundColor" border={CSSConstants.borderStyle}>
            <Heading size="lg" m="1em 0.5em">
              Customer Information
            </Heading>
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
            <Value className="value">
              {formatAddress(order.billingAddress)}
            </Value>
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
