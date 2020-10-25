import { OrderInterface } from "../../types/order";
import _ from "lodash";
import { formatPrice } from "utils/misc";
import { Grid, Box } from "@chakra-ui/core";

interface OrderSummaryProps {
  order: OrderInterface;
}

const OrderSummary = (props: OrderSummaryProps) => {
  const { order } = props;

  return (
    <Grid
      templateColumns="100px 100px"
      fontSize={["sm", "md"]}
      fontWeight="normal"
    >
      <Box as="span" my={2} fontWeight="bold">
        Sub Total
      </Box>
      <Box as="span" my={2} textAlign="right">
        {formatPrice(
          _.chain(order.items)
            .map((item) => item.discountedPrice)
            .sum()
            .value()
        )}
      </Box>
      <Box as="span" fontWeight="bold">
        Shipping Fee
      </Box>
      <Box as="span" textAlign="right">
        {" "}
        + {formatPrice(order.metadata.shipmentFee)}
      </Box>
      {order.discountSplits.map((discount) => (
        <>
          <Box as="span" fontWeight="bold" color="successColor">
            {discount.discountType}
          </Box>
          <Box as="span" textAlign="right" color="successColor">
            - {formatPrice(discount.discountAmount)}
          </Box>
        </>
      ))}
      <Box as="span" my={3} fontWeight="bold">
        Net Total
      </Box>
      <Box as="span" textAlign="right" my={3}>
        {formatPrice(order.totalPrice)}
      </Box>
    </Grid>
  );
};

export default OrderSummary;
