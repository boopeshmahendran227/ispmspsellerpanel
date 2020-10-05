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
import Button from "components/atoms/Button";
import BackLink from "components/atoms/BackLink";
import { Box, Heading, Grid, Divider } from "@chakra-ui/core";
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
      <Heading as="h6" size="md">
        <span className="id">
          #{order.id}-{orderItem.id}
        </span>{" "}
        <span className="time">
          {moment
            .utc(order.createdDateTime)
            .local()
            .format("MMMM Do YYYY h:mm a")}
        </span>{" "}
        <span className="status">
          {getOrderStatusText(orderItem.orderItemStatus)}
        </span>
        <span
          style={{
            backgroundColor: getPaymentModeColor(
              orderItem.order.paymentSplits[0].paymentMode
            ),
          }}
          className="paymentMode"
        >
          {getPaymentText(orderItem.order.paymentSplits[0].paymentMode)}
        </span>
      </Heading>
      <Box className="invoiceBtnContainer">
        <Button onClick={() => window.open(`/invoice/${orderItem.id}`)}>
          View Invoice
        </Button>
      </Box>
      <Grid templateColumns="1fr 300px" gap="1em">
        <Box flex="1">
          <section>
            <OrderItemDetail
              orderItem={orderItem}
              markAsShipping={props.markAsShipping}
              markAsShippingComplete={props.markAsShippingComplete}
              markPackageReadyForCollection={
                props.markPackageReadyForCollection
              }
              markAsProcessing={props.markAsProcessing}
              approveCancelOrderItem={props.approveCancelOrderItem}
              rejectCancelOrderItem={props.rejectCancelOrderItem}
              approveReturnOrderItem={props.approveReturnOrderItem}
              rejectReturnOrderItem={props.rejectReturnOrderItem}
              cancelOrderItem={props.cancelOrderItem}
            />
          </section>
          <Box>
            <ShippingInformationContainer orderItem={orderItem} />
          </Box>
        </Box>
        <Box>
          <section className="customerContainer">
            <Heading as="h6" size="md" m="1em 0.5em">
              Customer Information
            </Heading>

            <div className="name">Name</div>
            <div className="value">
              {order.customerName || "Name Not Available"}
            </div>
            <Divider />
            {Boolean(order.customerPhone) && (
              <>
                <div className="name">Phone</div>
                <div className="value">{order.customerPhone}</div>
                <Divider />
              </>
            )}

            <div className="name">Billing Address</div>
            <div className="value">{formatAddress(order.billingAddress)}</div>
            <Divider />

            <div className="name">Shipping Address</div>
            <div className="value">{formatAddress(order.shippingAddress)}</div>
          </section>
          <Box>
            <OrderInformation order={order} />
          </Box>
        </Box>
      </Grid>
      <style jsx>{`
        .container {
          margin: 1em auto;
          max-width: 1100px;
        }
        .flexContainer {
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-gap: 1em;
        }
        .col1 {
          flex: 1;
        }
        header .id {
          font-size: 1.6rem;
        }
        header {
          margin: 1em 0;
        }
        .invoiceBtnContainer {
          margin: 0.5em 0;
        }
        .time {
          color: ${CSSConstants.secondaryTextColor};
        }
        .status,
        .paymentMode {
          border-radius: 2em;
          display: inline-block;
          background: ${CSSConstants.primaryColor};
          padding: 0.2em 0.7em;
          color: white;
          margin: 0 0.3em;
        }
        .customerContainer {
          background: ${CSSConstants.foregroundColor};
          border: ${CSSConstants.borderStyle};
        }
        .customerContainer .header {
          font-weight: bold;
          font-size: 1.3rem;
          padding: 0.3em 0.5em;
          margin: 0.4em 0;
        }
        .row {
          border-bottom: ${CSSConstants.borderStyle};
        }
        .name {
          padding: 0.8em;
          margin-top: 0.4em;
          font-weight: bold;
        }
        .value {
          padding-bottom: 0.4em;
          padding-left: 0.8em;
          padding-right: 0.8em;
        }
      `}</style>
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
