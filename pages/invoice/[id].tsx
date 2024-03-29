import moment from "moment";
import _ from "lodash";
import { formatPrice, formatAddress, formatNumber } from "../../src/utils/misc";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "components/atoms/Loader";
import { OrderItemInterface, OrderStatus, OrderType } from "types/order";
import { InvoiceDetailInterface, InvoiceStatus } from "types/invoice";
import WithAuth from "components/atoms/WithAuth";
import PageError from "components/atoms/PageError";
import LogoIcon from "../../public/icons/logo.png";
import { Box, Grid, Flex, SimpleGrid, Heading, Image } from "@chakra-ui/core";

const Invoice = () => {
  const router = useRouter();
  const invoiceSWR = useSWR(`/invoice/${router.query.id}`);
  const invoice: InvoiceDetailInterface = invoiceSWR.data;

  const error = invoiceSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!invoice) {
    return <Loader />;
  }
  const order = invoice.order;
  const shippingFee = order.items[0].metadata.shipmentFeePerSeller;

  const subTotal = _.chain(order.items)
    .map((item) => item.discountedPrice)
    .sum()
    .value();

  const showWaterMark = invoice.invoiceStatus === InvoiceStatus.Pending;

  const isManufactureOrder = order.orderType === OrderType.Manufacturing;

  return (
    <Flex
      bg="white"
      maxW="950px"
      mx="auto"
      boxShadow="md"
      minH="100vh"
      fontSize={["10px", "sm", "md"]}
      justify="space-between"
      direction="column"
    >
      <Box flex="1">
        <Heading size="lg" textTransform="uppercase" textAlign="center" py={3}>
          Tax Invoice / Bill of Supply / Cash Memo
        </Heading>
        <Flex
          justify="space-between"
          py={2}
          px={4}
          className="section sellerSection"
        >
          <Box>
            <Grid templateColumns={["1fr", "80px 220px"]} className="row">
              <Box as="strong">Sold By: </Box>
              {invoice.businessDetails.name},<br />
              {formatAddress(invoice.businessAddress)}
            </Grid>
          </Box>
          <Box>
            <Grid templateColumns={["0.5fr 1fr", "80px 220px"]} className="row">
              <Box as="strong">GSTIN: </Box>
              <Box>{invoice.businessDetails.gstin}</Box>
              <Box as="strong">TAN: </Box>
              <Box>{invoice.businessDetails.tan}</Box>
            </Grid>
          </Box>
        </Flex>
        <SimpleGrid
          py={2}
          px={4}
          columns={[2, null, null, 3]}
          spacingY={2}
          className="section detailsSection"
        >
          <Box gridColumn={["1/3", null, null, "1/2"]}>
            <Grid
              templateColumns={["0.4fr 1fr 0.4fr 1fr ", "100px 160px"]}
              alignItems="center"
              maxWidth={["full"]}
            >
              <Box as="strong">Invoice No: </Box>
              {invoice.invoiceNumber}

              <Box as="strong">Order Id: </Box>
              {invoice.order.id}

              <Box as="strong">Date: </Box>
              {moment.utc(order.createdDateTime).local().format("MMMM Do YYYY")}

              <Box as="strong">PAN: </Box>
              <Box>{invoice.businessDetails.pan}</Box>
              <Box as="strong">CIN: </Box>
              {invoice.businessDetails.cin}
            </Grid>
          </Box>
          <Box py={2}>
            <Box as="strong">Billing Address: </Box>
            <Box>{order.customerName || "Name Not Available"},</Box>
            <Box>{formatAddress(order.billingAddress)}</Box>
          </Box>
          <Box py={2}>
            <Box as="strong">Shipping Address: </Box>
            <Box>{order.customerName || "Name Not Available"},</Box>
            <Box>{formatAddress(order.shippingAddress)}</Box>
          </Box>
        </SimpleGrid>
        <Box fontSize={["8px", "xs", "sm", "md"]}>
          <Box as="table" mt={3} mb={2} mx="auto" w="100%">
            <Box as="thead" borderBottom="1px solid #666666">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Unit price</th>
                <th>Qty</th>
                <th>Discount</th>
                <th>Net amount</th>
                <th>Tax Rate</th>
                <th>Tax Type</th>
                <th>Tax Amount</th>
                <th>Total amount</th>
              </tr>
            </Box>
            <tbody>
              {order.items.map((item: OrderItemInterface, index) => {
                const productName = item.productSnapshot.productName;
                const attributeValues = item.productSnapshot.attributeValues;
                const tax = item.taxDetails.totalTaxPaid;
                const mrp = item.actualUnitPriceWithoutTax;
                const discount = item.totalDiscount;
                const finalAmount = item.discountedPrice;

                return (
                  <Box
                    as="tr"
                    color={
                      item.orderItemStatus === OrderStatus.CancelCompleted
                        ? "dangerColor"
                        : "primaryTextColor.500"
                    }
                    textDecoration={
                      item.orderItemStatus === OrderStatus.CancelCompleted
                        ? "solid line-through red"
                        : "none"
                    }
                    key={index}
                  >
                    <td>{index + 1}</td>
                    <Box as="td" textAlign="initial" p={1}>
                      <Box fontWeight="bold">{productName}</Box>
                      <Box my={1}>
                        <Box>
                          {attributeValues.map((attributeValue) => (
                            <Box key={attributeValue.attributeId}>
                              {attributeValue.attributeName}:{" "}
                              {attributeValue.value}
                            </Box>
                          ))}
                        </Box>
                        <Box>Seller: {item.sellerName}</Box>
                      </Box>
                    </Box>
                    <td>{formatPrice(mrp)}</td>
                    <td>{formatNumber(item.qty)}</td>
                    <td>
                      - {formatPrice(discount)}
                      {item.loanDetail && (
                        <Box maxW="180px" m="auto">
                          (
                          <Box as="span">
                            Includes Loan Availed From{" "}
                            {item.loanDetail.providerName}:{" "}
                          </Box>
                          {formatPrice(item.loanDetail.loanAmountChosen)})
                        </Box>
                      )}
                    </td>
                    <td>{formatPrice(item.itemPrice)}</td>
                    <Box as="td" py={[1, 2]}>
                      <Box p={[1, 3]}>
                        {item.taxDetails.taxSplits.map((taxSplit) => (
                          <Box key={taxSplit.taxId}>
                            {taxSplit.taxPercentage}%
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <td>
                      {item.taxDetails.taxSplits.map((taxSplit) => (
                        <Box key={taxSplit.taxId} textAlign="center">
                          {taxSplit.taxName}
                        </Box>
                      ))}
                    </td>
                    <td>
                      {item.taxDetails.taxSplits.map((taxSplit) => (
                        <Box key={taxSplit.taxId}>
                          {formatPrice(taxSplit.taxAmountPaid)}
                        </Box>
                      ))}
                    </td>
                    <td>{formatPrice(finalAmount)}</td>
                  </Box>
                );
              })}
              <Box as="tr" bg="gray.100">
                {isManufactureOrder && (
                  <td colSpan={3}>
                    <Box as="span" fontSize="md" fontWeight="bold">
                      Total advance amount paid :
                    </Box>
                    &nbsp;
                    {formatPrice(
                      order.items
                        .map(
                          (item) =>
                            item.metadata.manufactureMetadata?.amountPaid
                        )
                        .reduce(
                          (totalAmount, currentAmount) =>
                            (totalAmount as number) + (currentAmount as number)
                        ) as number
                    )}
                  </td>
                )}
                <td colSpan={isManufactureOrder ? 4 : 7} />
                <td>Total</td>
                <td>{formatPrice(order.totalTax)}</td>
                <td>{formatPrice(subTotal)}</td>
              </Box>
              <Box as="tr" bg="gray.100">
                <td colSpan={7} />
                <td>Shipping Fee</td>
                <td />
                <td>{formatPrice(shippingFee)}</td>
              </Box>
              {order.discountSplits.map((discount, index) => (
                <Box
                  as="tr"
                  key={index}
                  color={"successColor.500"}
                  bg="gray.100"
                >
                  <td colSpan={7} />
                  <td>{discount.discountType}</td>
                  <td />
                  <td>- {formatPrice(discount.discountAmount)}</td>
                </Box>
              ))}
            </tbody>
          </Box>
        </Box>
        <Box as="section" textAlign="right" py={2} px={3}>
          <Box>Net Total </Box>
          <Box fontSize={["md", "xl"]}>{formatPrice(order.totalPrice)}</Box>
        </Box>
      </Box>
      <Box textAlign="center">
        <Image w="5rem" src={LogoIcon} alt="logo" mx="auto" />
        <Box>Thank You for shopping with us!!</Box>
      </Box>
      {showWaterMark && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
        >
          <Box
            transform="rotate(-25deg)"
            border="2px solid red"
            borderRadius={8}
            px={3}
            py={1}
          >
            <Box
              fontSize="2xl"
              textTransform="uppercase"
              color="dangerColor"
              fontWeight="bold"
              textAlign="center"
            >
              Pending
            </Box>
            <Box
              textAlign="center"
              textTransform="uppercase"
              color="secondaryTextColor.500"
              mt={"-0.3em"}
            >
              (Credit Not Settled)
            </Box>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default WithAuth(Invoice);
