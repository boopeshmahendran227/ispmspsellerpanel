import { OrderItemInterface } from "../../types/order";
import { isCompletedOrderStatus, isShippingOrderStatus } from "utils/order";
import moment from "moment";
import { Box, Flex, Link, Heading, SimpleGrid } from "@chakra-ui/core";
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
      <Flex align="baseline" fontSize={["xs", "sm"]}>
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
      <SimpleGrid columns={2} spacing={3} fontSize={["sm", "md"]} my={2}>
        <Box color="secondaryTextColor">Provider Name:</Box>
        <Box>{orderItem.shipment.providerName}</Box>
        <Box color="secondaryTextColor">Tracking Code:</Box>
        <Box>AWB-{orderItem.shipment.shiprocketResponse?.awb_code}</Box>
        <Box color="secondaryTextColor">Pickup Token Number:</Box>
        <Box>{orderItem.shipment.shiprocketResponse?.pickup_token_number}</Box>
        <Box color="secondaryTextColor">Pickup Scheduled Date:</Box>
        <Box>
          {moment(
            orderItem.shipment.shiprocketResponse?.pickup_scheduled_date
          ).format("MMM D, YYYY")}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ShippingInformationContainer;
