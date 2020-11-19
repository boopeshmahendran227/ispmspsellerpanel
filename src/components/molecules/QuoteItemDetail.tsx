import {
  QuoteStatus,
  QuoteDetailInterface,
  QuoteInterface,
} from "../../types/quote";
import { getQuoteStatusText, getColor } from "utils/quote";
import _ from "lodash";
import moment from "moment";
import QuoteProduct from "./QuoteProduct";
import { Box, Divider, Stack } from "@chakra-ui/core";
import React from "react";
import Button from "components/atoms/Button";

interface QuoteItemDetailProps {
  quote: QuoteDetailInterface;
  updateQuote: (quote: QuoteInterface) => void;
  rejectQuote: (quote: QuoteInterface) => void;
}

const QuoteItemDetail = (props: QuoteItemDetailProps) => {
  const { quote } = props;

  const getButtons = (quote: QuoteDetailInterface) => {
    const handleClick = (e, action) => {
      action(quote);
      e.preventDefault();
    };

    switch (quote.status) {
      case QuoteStatus.SellerResponsePending:
        return (
          <Stack
            isInline
            spacing={[1, 3]}
            mx="auto"
            shouldWrapChildren
            justify="flex-end"
          >
            <Button
              variantColor="successColorVariant"
              onClick={(e) => handleClick(e, props.updateQuote)}
            >
              Respond To Quote
            </Button>
            <Button
              variant="outline"
              variantColor="dangerColorVariant"
              onClick={(e) => handleClick(e, props.rejectQuote)}
            >
              Reject Quote
            </Button>
          </Stack>
        );
    }
    return null;
  };

  const buttons = getButtons(quote);
  const color = getColor(quote.status);
  const statusText = getQuoteStatusText(quote.status);

  const latestStatus = quote.statusHistories[quote.statusHistories.length - 1];

  return (
    <Box
      border="1px"
      bg="foregroundColor.500"
      borderColor={color}
      maxW=" 1000px"
      w="100%"
      m="auto"
      mb={3}
    >
      <Box textAlign="right" p={[2, 3]} fontSize={["md", "lg"]} color={color}>
        <Box as="span">{statusText} </Box>
        <Box as="span">
          {moment
            .utc(latestStatus.createdDateTime)
            .local()
            .format("MMM DD YYYY")}
        </Box>
      </Box>
      <Box pt={[2, 5]} px={3}>
        {quote.productDetails.map((productDetail) => (
          <QuoteProduct key={productDetail.id} productDetail={productDetail} />
        ))}
      </Box>
      {Boolean(buttons) && (
        <>
          <Box mt={2} borderTop="1px" borderColor={color} p={3}>
            {buttons}
          </Box>
        </>
      )}
    </Box>
  );
};

export default QuoteItemDetail;
