import { Box, Flex } from "@chakra-ui/core";
import StatusBar, { StatusType } from "components/atoms/StatusBar";
import moment from "moment";
import React from "react";
import { ManufactureMetadata, PayoutStatus } from "types/order";
import { formatPrice } from "utils/misc";

const ManufactureOrderData = (props: {
  manufactureMetadata: ManufactureMetadata;
}) => {
  const { manufactureMetadata } = props;

  if (manufactureMetadata.payment.length === 0) {
    return null;
  }

  const statusListMap = manufactureMetadata.payment.map(
    (advancePaymentMetadata) => {
      return {
        status: advancePaymentMetadata.payoutStatus,
        title: advancePaymentMetadata.orderStateStr,
        type:
          advancePaymentMetadata.payoutStatus === PayoutStatus.Paid
            ? StatusType.success
            : StatusType.warning,
      };
    }
  );

  return (
    <Box p={3} mb={5}>
      <Box mx="auto" position="relative" mb={4}>
        <Box fontWeight="bold" color="primaryTextColor.500" fontSize="lg">
          Payment details
        </Box>
        <Box position="absolute" right={1} top={1}>
          Total amount Paid:&nbsp;
          <Box as="span" fontWeight="bold" color="primaryTextColor.500">
            {formatPrice(manufactureMetadata?.amountPaid)}
          </Box>
        </Box>
      </Box>
      <Flex justify="center">
        <StatusBar
          activeStatuses={[PayoutStatus.Paid]}
          getStatusText={(orderStateStr) => {
            const metaData = manufactureMetadata.payment.filter(
              (data) => data.orderStateStr === orderStateStr
            )[0];
            const isPaid =
              manufactureMetadata.payment.filter(
                (data) => data.orderStateStr === orderStateStr
              )[0].payoutStatus === PayoutStatus.Paid;

            if (isPaid) {
              return (
                formatPrice(metaData.amountPaid) +
                " paid on " +
                moment.utc(metaData.updatedTime).local().format("ddd Do, MMM")
              );
            }
            return "";
          }}
          statusListMap={statusListMap}
        />
      </Flex>
    </Box>
  );
};

export default ManufactureOrderData;
