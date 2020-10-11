import moment from "moment";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "components/atoms/Loader";
import { connect } from "react-redux";
import { QuoteInterface, QuoteDetailInterface } from "types/quote";
import { getQuoteStatusText } from "utils/quote";
import QuoteItemDetail from "components/molecules/QuoteItemDetail";
import QuoteActions from "actions/quote";
import PageError from "components/atoms/PageError";
import WithAuth from "components/atoms/WithAuth";
import BackLink from "components/atoms/BackLink";
import { Box, Grid, Stack, Heading, Tag, Flex, Divider } from "@chakra-ui/core";

const Name = (props) => (
  <Box fontWeight="bold" py={2} px={4} mt={2}>
    {props.children}
  </Box>
);

const Value = (props) => (
  <Box py={2} px={4}>
    {props.children}
  </Box>
);

interface DispatchProps {
  rejectQuote: (quote: QuoteInterface) => void;
  updateQuote: (quote: QuoteInterface) => void;
}

type QuoteProps = DispatchProps;

const Quote = (props: QuoteProps) => {
  const router = useRouter();

  const swr = useSWR(`/quote/${router.query.id}`);
  const quote: QuoteDetailInterface = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!quote) {
    return <Loader />;
  }

  return (
    <Box my={1} mx="auto" maxW="1100px">
      <BackLink href="/quote">Back to Quotes</BackLink>
      <Stack isInline spacing={3} my={4} align="baseline">
        <Heading size="lg">
          <Box as="span">#{quote.id}</Box>
          <Box
            as="span"
            fontSize="md"
            color="secondaryTextColor"
            fontWeight="normal"
          >
            {moment
              .utc(quote.createdDateTime)
              .local()
              .format("MMMM Do YYYY h:mm a")}
          </Box>{" "}
        </Heading>
        <Box>
          <Tag
            variant="solid"
            rounded="full"
            size="md"
            variantColor="primaryColorVariant"
          >
            {getQuoteStatusText(quote.status)}{" "}
          </Tag>
        </Box>
      </Stack>
      <Grid templateColumns="1fr 300px" gap={3}>
        <Flex flex="1">
          <QuoteItemDetail
            quote={quote}
            rejectQuote={props.rejectQuote}
            updateQuote={props.updateQuote}
          />
        </Flex>
        <Box>
          <Box bg="foregroundColor" border="1px solid #ccc">
            <Heading size="md" my={4} mx={3}>
              Customer Information
            </Heading>

            <Name>Name</Name>
            <Value>{quote.customerName || "Name Not Available"}</Value>
            <Divider />
            {Boolean(quote.customerPhone) && (
              <>
                <Name>Phone</Name>
                <Value className="value">{quote.customerPhone}</Value>
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  rejectQuote: QuoteActions.rejectQuote,
  updateQuote: QuoteActions.updateQuote,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Quote)
);
