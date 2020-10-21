import {
  QuoteStatus,
  QuoteDetailInterface,
  QuoteInterface,
} from "../../types/quote";
import { getQuoteStatusText, getColor } from "utils/quote";
import _ from "lodash";
import moment from "moment";
import QuoteProduct from "./QuoteProduct";
import { Button, Box, Divider, ButtonGroup } from "@chakra-ui/core";
import React from "react";

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
          <ButtonGroup spacing={3}>
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
          </ButtonGroup>
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
      bg="foregroundColor"
      borderColor={color}
      maxW=" 1000px"
      w="100%"
      m="auto"
      mb={3}
    >
      <Box textAlign="right" p={3} fontSize="lg" color={color}>
        <Box as="span">{statusText}</Box>
        <Box as="span">
          {" "}
          {moment

            .utc(latestStatus.createdDateTime)
            .local()
            .format("MMM DD YYYY")}
        </Box>
      </Box>

      <Box pt={5} px={1}>
        {quote.productDetails.map((productDetail) => (
          <QuoteProduct key={productDetail.id} productDetail={productDetail} />
        ))}
      </Box>

      {Boolean(buttons) && (
        <>
          <Divider borderColor={color} />
          <Box mt={3} p={2} textAlign="right">
            {buttons}
          </Box>
        </>
      )}
    </Box>
  );
};

export default QuoteItemDetail;
