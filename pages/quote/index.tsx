import { connect } from "react-redux";
import CSSConstants from "../../src/constants/CSSConstants";
import TabSection from "components/atoms/TabSection";
import SortableTable from "components/atoms/SortableTable";
import { QuoteInterface, QuoteStatus } from "types/quote";
import { getQuoteStatusText } from "utils/quote";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import Link from "next/link";
import ProductCard from "components/atoms/ProductCard";
import moment from "moment";
import QuoteActions from "actions/quote";
import { formatPrice } from "utils/misc";
import { getColor } from "utils/quote";
import PageError from "components/atoms/PageError";
import { getCustomerInfo } from "utils/customer";
import WithAuth from "components/atoms/WithAuth";
import PageContainer from "components/atoms/PageContainer";
import PageHeader from "components/atoms/PageHeader";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageBodyContainer from "components/atoms/PageBodyContainer";
import { Box, Button, ButtonGroup } from "@chakra-ui/core";
import MobileMediaQuery from "components/atoms/MobileMediaQuery";
import DesktopMediaQuery from "components/atoms/DesktopMediaQuery";
import Select from "components/atoms/Select";
import { useState } from "react";
import { SelectOptionInterface } from "types/product";

interface DispatchProps {
  updateQuote: (quote: QuoteInterface) => void;
  rejectQuote: (quote: QuoteInterface) => void;
}

type QuotesProps = DispatchProps;

const getTotalOriginalPrice = (quote: QuoteInterface) =>
  quote.productDetails.reduce(
    (acc, productDetail) =>
      acc + productDetail.productDetails.skuPrice * productDetail.qty,
    0
  );

const getTotalRequestedPrice = (quote: QuoteInterface) =>
  quote.productDetails.reduce(
    (acc, productDetail) => acc + productDetail.price,
    0
  );

const getTotalUpdatedPrice = (quote: QuoteInterface) =>
  quote.productDetails.reduce(
    (acc, productDetail) =>
      acc + (productDetail.updatedQuote?.totalDiscountedPrice || 0),
    0
  );

const getTotalQty = (quote: QuoteInterface) =>
  quote.productDetails.reduce(
    (acc, productDetail) => acc + productDetail.qty,
    0
  );

const Quotes = (props: QuotesProps) => {
  const [type, setType] = useState<SelectOptionInterface>({
    value: [],
    label: "select",
  });

  const getTableHeaders = () => {
    return [
      {
        name: "Quote Id",
        valueFunc: (quote: QuoteInterface) => quote.id,
      },
      {
        name: "Customer",
        valueFunc: (quote: QuoteInterface) => null,
      },
      {
        name: "Product",
        valueFunc: (quote: QuoteInterface) => null,
      },
      {
        name: "Total Qty",
        valueFunc: (quote: QuoteInterface) => getTotalQty(quote),
      },
      {
        name: "Total Original Price",
        valueFunc: (quote: QuoteInterface) => getTotalOriginalPrice(quote),
      },
      {
        name: "Total Requested Price",
        valueFunc: (quote: QuoteInterface) => getTotalRequestedPrice(quote),
      },
      {
        name: "Total Responded Price",
        valueFunc: (quote: QuoteInterface) => getTotalUpdatedPrice(quote),
      },
      {
        name: "Status",
        valueFunc: (quote: QuoteInterface) => getQuoteStatusText(quote.status),
      },
      {
        name: "Created",
        valueFunc: (quote: QuoteInterface) => quote.createdDateTime,
      },
      {
        name: "Actions",
        valueFunc: (quote: QuoteInterface) => null,
      },
    ];
  };

  const getButtons = (quote: QuoteInterface) => {
    const handleClick = (e, action) => {
      action(quote);
      e.preventDefault();
    };

    switch (quote.status) {
      case QuoteStatus.SellerResponsePending:
        return (
          <ButtonGroup spacing={1}>
            <Button
              my={2}
              size="sm"
              variantColor="successColorVariant"
              onClick={(e) => handleClick(e, props.updateQuote)}
            >
              Respond To Quote
            </Button>
            <Button
              size="sm"
              variantColor="dangerColorVariant"
              variant="outline"
              onClick={(e) => handleClick(e, props.rejectQuote)}
            >
              Reject Quote
            </Button>
          </ButtonGroup>
        );
    }
    return null;
  };

  const renderTableBody = (quotes: QuoteInterface[]) => {
    return quotes.map((quote) => (
      <Link key={quote.id} href="/quote/[id]" as={`/quote/${quote.id}`}>
        <tr>
          <td>{quote.id}</td>
          <td>{getCustomerInfo(quote)}</td>
          <td>
            {quote.productDetails.map((productDetail) => (
              <div key={productDetail.id} className="productContainer">
                <ProductCard
                  name={productDetail.productDetails.name}
                  image={productDetail.productDetails.imageRelativePaths[0]}
                  metaInfo={[
                    ...productDetail.productDetails.attributeValueIds.map(
                      (attributeValue) => ({
                        key: attributeValue.attributeName,
                        value: attributeValue.value,
                      })
                    ),
                    {
                      key: "Product Id",
                      value: productDetail.productId,
                    },
                    {
                      key: "Sku Id",
                      value: productDetail.skuId,
                    },
                    {
                      key: "Original Price",
                      value: `${formatPrice(
                        productDetail.productDetails.skuPrice
                      )} x
                      ${productDetail.qty} = ${formatPrice(
                        productDetail.productDetails.skuPrice *
                          productDetail.qty
                      )}`,
                    },
                    {
                      key: "Requested Quote",
                      value: `${formatPrice(
                        productDetail.price / productDetail.qty
                      )} x
                      ${productDetail.qty} = ${formatPrice(
                        productDetail.price
                      )}`,
                    },
                  ]}
                />
              </div>
            ))}
          </td>
          <td>{getTotalQty(quote)}</td>
          <td>{formatPrice(getTotalOriginalPrice(quote))}</td>
          <td>{formatPrice(getTotalRequestedPrice(quote))}</td>
          <td>
            {quote.status !== QuoteStatus.SellerResponsePending ? (
              formatPrice(getTotalUpdatedPrice(quote))
            ) : (
              <span className="notRespondedMsg">Not yet Responded</span>
            )}
          </td>
          <td style={{ color: getColor(quote.status) }}>
            {getQuoteStatusText(quote.status)}
          </td>
          <td>
            {moment
              .utc(quote.createdDateTime)
              .local()
              .format("MMMM Do YYYY, hh:mm A")}
          </td>
          <td className="actions">{getButtons(quote)}</td>
          <style jsx>{`
            .productContainer {
              text-align: initial;
              margin: 1.2em 0;
            }
            tr:hover {
              background-color: ${CSSConstants.hoverColor} !important;
              cursor: pointer;
            }
            .actions {
              font-size: 0.9rem;
            }
            .notRespondedMsg {
              color: ${CSSConstants.warningColor};
              font-weight: bold;
            }
          `}</style>
        </tr>
      </Link>
    ));
  };

  const swr = useSWR("/quote");
  const quotes: QuoteInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!quotes) {
    return <Loader />;
  }

  const openQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.SellerResponsePending
  );

  const respondedQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.SellerResponded
  );

  const convertedQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.Converted
  );

  const rejectedQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.Rejected
  );

  const expiredQuotes = quotes.filter(
    (quote) => quote.status === QuoteStatus.Expired
  );

  const filter: SelectOptionInterface[] = [
    {
      value: quotes,
      label: `All Quotes (${quotes.length})`,
    },
    {
      value: respondedQuotes,
      label: `RespondedQuotes(${respondedQuotes.length})`,
    },
    {
      value: expiredQuotes,
      label: `ExpiredQuotes (${expiredQuotes.length})`,
    },
  ];
  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader>Quotes</PageHeader>
      </PageHeaderContainer>
      <PageBodyContainer>
        <MobileMediaQuery>
          <Box maxW="250px" mb={3} p={2}>
            <Select
              value={type}
              options={filter}
              onChange={(value) => setType(value)}
            />
          </Box>
          <SortableTable
            initialSortData={{
              index: 2,
              isAsc: false,
            }}
            headers={getTableHeaders()}
            data={type.value as QuoteInterface[]}
            emptyMsg={"There are no Quotes in selected category"}
            body={renderTableBody}
          />
        </MobileMediaQuery>
        <DesktopMediaQuery>
          <TabSection
            headingList={[
              `All Quotes (${quotes.length})`,
              `Open Quotes (${openQuotes.length})`,
              `Responded Quotes (${respondedQuotes.length})`,
              `Converted Quotes (${convertedQuotes.length})`,
              `Rejected Quotes (${rejectedQuotes.length})`,
              `Expired Quotes (${expiredQuotes.length})`,
            ]}
            contentList={[
              <SortableTable
                initialSortData={{
                  index: 1,
                  isAsc: false,
                }}
                headers={getTableHeaders()}
                data={quotes}
                emptyMsg="There are no quotes"
                body={renderTableBody}
              />,
              <SortableTable
                initialSortData={{
                  index: 1,
                  isAsc: false,
                }}
                headers={getTableHeaders()}
                data={openQuotes}
                emptyMsg="There are no open quotes"
                body={renderTableBody}
              />,
              <SortableTable
                initialSortData={{
                  index: 1,
                  isAsc: false,
                }}
                headers={getTableHeaders()}
                data={respondedQuotes}
                emptyMsg="There are no responded quotes"
                body={renderTableBody}
              />,
              <SortableTable
                initialSortData={{
                  index: 1,
                  isAsc: false,
                }}
                headers={getTableHeaders()}
                data={convertedQuotes}
                emptyMsg="There are no converted quotes"
                body={renderTableBody}
              />,
              <SortableTable
                initialSortData={{
                  index: 1,
                  isAsc: false,
                }}
                headers={getTableHeaders()}
                data={rejectedQuotes}
                emptyMsg="There are no rejected quotes"
                body={renderTableBody}
              />,
              <SortableTable
                initialSortData={{
                  index: 1,
                  isAsc: false,
                }}
                headers={getTableHeaders()}
                data={expiredQuotes}
                emptyMsg="There are no expired quotes"
                body={renderTableBody}
              />,
            ]}
          />
        </DesktopMediaQuery>
      </PageBodyContainer>
    </PageContainer>
  );
};

const mapDispatchToProps: DispatchProps = {
  updateQuote: QuoteActions.updateQuote,
  rejectQuote: QuoteActions.rejectQuote,
};

export default WithAuth(
  connect<null, DispatchProps>(null, mapDispatchToProps)(Quotes)
);
