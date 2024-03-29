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
  <Box fontWeight="bold" py={1} px={3} mt={1}>
    {props.children}
  </Box>
);

const Value = (props) => <Box px={3}>{props.children}</Box>;

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
    <Box my={3} maxW="1100px" mx={[2, null, null, null, "auto"]}>
      <BackLink href="/quote">Back to Quotes</BackLink>
      <Stack flexDirection={["column", "row"]} my={4} align="baseline">
        <Heading size="md">
          <Box as="span">#{quote.id} </Box>
          <Box
            as="span"
            fontSize="md"
            color="secondaryTextColor.500"
            fontWeight="normal"
          >
            {" "}
            {moment
              .utc(quote.createdDateTime)
              .local()
              .format("MMMM Do YYYY h:mm a")}
          </Box>{" "}
        </Heading>
        <Box mx={2}>
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
      <Grid templateColumns={["1fr", null, null, "1fr 300px"]} gap={4}>
        <QuoteItemDetail
          quote={quote}
          rejectQuote={props.rejectQuote}
          updateQuote={props.updateQuote}
        />
        <Box>
          <Box bg="foregroundColor.500" border="1px solid #ccc">
            <Box fontSize="lg" fontWeight="bold" my={3} mx={3}>
              Customer Information
            </Box>
            <Name>Name</Name>
            <Value>{quote.customerName || "Name Not Available"}</Value>
            <Divider />
            {Boolean(quote.customerPhone) && (
              <>
                <Name>Phone</Name>
                <Value>{quote.customerPhone}</Value>
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
