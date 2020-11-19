import ProductCard from "../atoms/ProductCard";
import { OrderStatus, TransformedOrderItemInterface } from "../../types/order";
import { formatPrice, splitCamelCase } from "utils/misc";
import _ from "lodash";
import { Fragment } from "react";
import moment from "moment";
import { getColor, getOrderStatusText } from "utils/order";
import { Box, Grid, Stack, SimpleGrid } from "@chakra-ui/core";
import Button from "components/atoms/Button";

interface OrderItemDetailProps {
  orderItem: TransformedOrderItemInterface;
  markAsShipping: (orderId: number, orderItemId: number) => void;
  markPackageReadyForCollection: (orderId: number, orderItemId: number) => void;
  markAsShippingComplete: (orderId: number, orderItemId: number) => void;
  markAsProcessing: (orderId: number, orderItemId: number) => void;
  approveReturnOrderItem: (orderId: number, orderItemId: number) => void;
  rejectReturnOrderItem: (orderId: number, orderItemId: number) => void;
  approveCancelOrderItem: (orderId: number, orderItemId: number) => void;
  rejectCancelOrderItem: (orderId: number, orderItemId: number) => void;
  cancelOrderItem: (orderId: number, orderItemId: number) => void;
}

const OrderItemDetail = (props: OrderItemDetailProps) => {
  const { orderItem } = props;

  const Key = (props) => <Box gridColumn="2">{props.children}</Box>;

  const getButtons = () => {
    switch (orderItem.orderItemStatus) {
      case OrderStatus.PaymentSuccess:
      case OrderStatus.PaymentOnDelivery:
        return (
          <Stack isInline spacing={3} justify="flex-end">
            <Box>
              <Button
                variantColor="successColorVariant"
                onClick={() =>
                  props.markAsProcessing(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
              >
                Mark as Processing
              </Button>
            </Box>
            <Box>
              {" "}
              <Button
                onClick={() =>
                  props.cancelOrderItem(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
                variant="outline"
                variantColor="dangerColorVariant"
              >
                Cancel Order
              </Button>
            </Box>
          </Stack>
        );
      case OrderStatus.SellerProcessing:
        if (orderItem.isSelfPickup) {
          return (
            <Stack isInline spacing={3}  justify="flex-end">
              <Box>
                <Button
                  variantColor="successColorVariant"
                  onClick={() =>
                    props.markPackageReadyForCollection(
                      props.orderItem.order.id,
                      props.orderItem.id
                    )
                  }
                >
                  Mark Package Ready For Collection
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outline"
                  variantColor="dangerColorVariant"
                  onClick={() =>
                    props.cancelOrderItem(
                      props.orderItem.order.id,
                      props.orderItem.id
                    )
                  }
                >
                  Cancel Order
                </Button>
              </Box>
            </Stack>
          );
        }
        return (
          <Stack isInline spacing={3}  justify="flex-end">
            <Box>
              <Button
                variantColor="successColorVariant"
                onClick={() =>
                  props.markAsShipping(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
              >
                Mark as Shipping
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() =>
                  props.cancelOrderItem(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
                variant="outline"
                variantColor="dangerColorVariant"
              >
                Cancel Order
              </Button>
            </Box>
          </Stack>
        );
      case OrderStatus.PackageReadyForCollection:
        return (
          <Stack isInline spacing={3}  justify="flex-end">
            <Box>
              <Button
                variantColor="successColorVariant"
                onClick={() =>
                  props.markAsShippingComplete(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
              >
                Mark as Delivered & Cash Received
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() =>
                  props.cancelOrderItem(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
                variant="outline"
                variantColor="dangerColorVariant"
              >
                Cancel Order
              </Button>
            </Box>
          </Stack>
        );
      case OrderStatus.Shipping:
        return (
          <Stack isInline spacing={3}  justify="flex-end">
            <Box>
              <Button
                variantColor="successColorVariant"
                onClick={() =>
                  props.markAsShippingComplete(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
              >
                Mark as Delivered
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() =>
                  props.cancelOrderItem(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
                variant="outline"
                variantColor="dangerColorVariant"
              >
                Cancel Order
              </Button>
            </Box>
          </Stack>
        );
      case OrderStatus.CancelRequested:
        return (
          <Stack isInline spacing={3}  justify="flex-end">
            <Box>
              <Button
                onClick={() =>
                  props.approveCancelOrderItem(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
                variantColor="successColorVariant"
              >
                Approve Cancel Request
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() =>
                  props.rejectCancelOrderItem(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
                variant="outline"
                variantColor="dangerColorVariant"
              >
                Reject Cancel Request
              </Button>
            </Box>
          </Stack>
        );
      case OrderStatus.ReturnRequested:
        return (
          <Stack isInline spacing={3}  justify="flex-end">
            <Box>
              <Button
                onClick={() =>
                  props.approveReturnOrderItem(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
                variantColor="successColorVariant"
              >
                Approve Return Request
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() =>
                  props.rejectReturnOrderItem(
                    props.orderItem.order.id,
                    props.orderItem.id
                  )
                }
                variant="outline"
                variantColor="dangerColorVariant"
              >
                Reject Return Request
              </Button>
            </Box>
          </Stack>
        );
    }
    return null;
  };

  const buttons = getButtons();
  const color = getColor(orderItem.orderItemStatus);
  const orderText = getOrderStatusText(orderItem.orderItemStatus);

  const latestStatus =
    orderItem.orderItemStatusHistories[
      orderItem.orderItemStatusHistories.length - 1
    ];

  return (
    <Box
      border="1px"
      bg="foregroundColor.500"
      borderColor={color}
      maxW=" 1000px"
      w="100%"
      m="auto"
      pt={3}
    >
      <Box textAlign="right" px={3} fontSize={["sm", "md", "lg"]} color={color}>
        <Box as="span">{orderText}</Box>
        <Box as="span">
          {" "}
          {moment
            .utc(latestStatus.createdDateTime)
            .local()
            .format("MMM DD YYYY")}
        </Box>
      </Box>
      <Box p={3} mt={-8}>
        <Box>
          <ProductCard
            name={orderItem.productSnapshot.productName}
            image={orderItem.productSnapshot.images[0]}
            metaInfo={orderItem.productSnapshot.attributeValues.map(
              (attributeValue) => ({
                key: attributeValue.attributeName,
                value: attributeValue.value,
              })
            )}
          />
          <Grid
            templateColumns={["1fr 1fr", "100px 120px"]}
            color="secondaryTextColor.500"
          >
            <Box fontWeight="bold">Product Id: </Box>
            <Box>{orderItem.productId}</Box>
            <Box fontWeight="bold">SKU: </Box>
            <Box>{orderItem.skuId}</Box>
          </Grid>
        </Box>
        <SimpleGrid
          columns={3}
          maxW="420px"
          ml="auto"
          mt={[1, null, null, null, -5]}
          fontSize="sm"
        >
          <Box>
            {formatPrice(orderItem.actualPrice / orderItem.qty)} x{" "}
            {orderItem.qty}
          </Box>

          <Key>MRP</Key>
          <Box mb={2}>{formatPrice(orderItem.actualPrice)}</Box>

          <Key>Item Price</Key>
          <Box>{formatPrice(orderItem.actualPriceWithoutTax)}</Box>
          {_.map(orderItem.productSnapshot.discountSplit, (value, key) => (
            <Fragment key={key}>
              <Key>{splitCamelCase(key)}</Key>
              <Box>- {formatPrice(value * orderItem.qty)}</Box>
            </Fragment>
          ))}
          {orderItem.loanDetail && (
            <Fragment>
              <Key>Loan ({orderItem.loanDetail.providerName})</Key>
              <Box>- {formatPrice(orderItem.loanDetail.loanAmountChosen)}</Box>
              <Key>Loan Processing Fee</Key>
              <Box>+ {formatPrice(orderItem.loanDetail.loanProcessingFee)}</Box>
            </Fragment>
          )}
          {orderItem.taxDetails.taxSplits.map((taxSplit, index) => (
            <Fragment key={index}>
              <Key>{taxSplit.taxName}:</Key>
              <Box>+ {formatPrice(taxSplit.taxAmountPaid)}</Box>
            </Fragment>
          ))}

          <Key>
            {" "}
            <Box fontWeight="bold" py={2}>
              Net Price
            </Box>
          </Key>
          <Box py={2} fontWeight="bold">{formatPrice(orderItem.discountedPrice)}</Box>
          <Box></Box>
        </SimpleGrid>
      </Box>
      {Boolean(buttons) && (
        <Box mt={2} borderTop="1px" borderColor={color} p={3} >
          {buttons}
        </Box>
      )}
    </Box>
  );
};

export default OrderItemDetail;
