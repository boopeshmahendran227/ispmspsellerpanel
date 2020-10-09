import { OrderInterface } from "../../types/order";
import _ from "lodash";
import { formatPrice } from "utils/misc";
import CSSConstants from "../../constants/CSSConstants";
import { Grid, Box } from "@chakra-ui/core";

interface OrderSummaryProps {
  order: OrderInterface;
}

const OrderSummary = (props: OrderSummaryProps) => {
  const { order } = props;

  return (
    <Grid templateColumns="100px 100px" fontSize="md" fontWeight="normal">
      <Box as="span" m="0.1em 0" fontWeight="bold">
        Sub Total
      </Box>
      <Box as="span" textAlign="right">
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
      <Box as="span" margin="0.6em 0" fontWeight="bold">
        Net Total
      </Box>
      <Box as="span" textAlign="right" margin="0.6em 0">
        {formatPrice(order.totalPrice)}
      </Box>
    </Grid>
  );
};

export default OrderSummary;
