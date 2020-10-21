import { OrderInterface } from "../../types/order";
import OrderSummary from "../atoms/OrderSummary";
import { Box, Heading, Stack } from "@chakra-ui/core";

interface OrderInformationProps {
  order: OrderInterface;
}

const OrderInformation = (props: OrderInformationProps) => {
  const { order } = props;

  return (
    <Box p={3} border="1px solid #ccc" bg="white">
      <Stack spacing={3}>
        <Heading fontWeight="bold" fontSize="lg">
          Order Information (#{order.id})
        </Heading>
        <Heading size="md">Order Summary</Heading>
        <Box>
          <OrderSummary order={order} />
        </Box>
      </Stack>
    </Box>
  );
};

export default OrderInformation;
