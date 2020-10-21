import CSSConstants from "../../constants/CSSConstants";
import { OrderItemInterface } from "../../types/order";
import { isCompletedOrderStatus, isShippingOrderStatus } from "utils/order";
import moment from "moment";
import { Box, Flex, Link, Heading } from "@chakra-ui/core";
import React from "react";

interface ShippingInformationContainerProps {
  orderItem: OrderItemInterface;
}

const ShippingInformationContainer = (
  props: ShippingInformationContainerProps
) => {
  const { orderItem } = props;

  if (
    !isShippingOrderStatus(orderItem.orderItemStatus) &&
    !isCompletedOrderStatus(orderItem.orderItemStatus)
  ) {
    return null;
  }

  return (
    <Box border="1px" borderColor="borderColor" p={3} my={5} bg="white">
      <Flex align="baseline">
        <Heading size="md">Shipping Information</Heading>
        <Link
          color="secondaryColor"
          display="inline-block"
          mx={2}
          textDecoration="underline"
          href={orderItem.shipment.shiprocketResponse?.label_url}
        >
          Download Shipping Label
        </Link>
        <Link
          color="secondaryColor"
          display="inline-block"
          mx={2}
          textDecoration="underline"
          href={orderItem.shipment.shiprocketResponse?.manifest_url}
        >
          Download Manifest
        </Link>
      </Flex>
      <table>
        <tr>
          <td className="key"> Provider Name:</td>
          <td> {orderItem.shipment.providerName}</td>
        </tr>
        <tr>
          <td className="key">Tracking Code:</td>
          <td>AWB-{orderItem.shipment.shiprocketResponse?.awb_code}</td>
        </tr>
        <tr>
          <td className="key">Pickup Token Number:</td>
          <td>{orderItem.shipment.shiprocketResponse?.pickup_token_number}</td>
        </tr>
        <tr>
          <td className="key">Pickup Scheduled Date: </td>
          <td>
            {moment(
              orderItem.shipment.shiprocketResponse?.pickup_scheduled_date
            ).format("MMM D, YYYY")}
          </td>
        </tr>
      </table>
      <style jsx>{`
        .key {
          color: ${CSSConstants.secondaryTextColor};
        }
      `}</style>
    </Box>
  );
};

export default ShippingInformationContainer;