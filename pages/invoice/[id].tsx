import moment from "moment";
import _ from "lodash";
import { formatPrice, formatAddress, formatNumber } from "../../src/utils/misc";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "../../src/components/Loader";
import { OrderItemInterface, OrderStatus } from "../../src/types/order";
import { InvoiceDetailInterface, InvoiceStatus } from "../../src/types/invoice";
import WithAuth from "../../src/components/WithAuth";
import PageError from "../../src/components/PageError";
import LogoIcon from "../../public/icons/logo.png";
import CSSConstants from "../../src/constants/CSSConstants";
import classNames from "classnames";

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

  return (
    <section className="container">
      <div className="body">
        <div className="title">Invoice</div>
        <section className="section sellerSection">
          <div className="row">
            <strong>Sold By: </strong>
            {invoice.businessDetails.name},<br />
            {formatAddress(invoice.businessAddress)}
          </div>
          <div className="row">
            <strong>GSTIN: </strong>
            {invoice.businessDetails.gstin}
          </div>
          <div className="row">
            <strong>TAN: </strong>
            {invoice.businessDetails.tan}
          </div>
        </section>
        <section className="section detailsSection">
          <div>
            <div className="row invoiceNumber">
              <strong>Invoice No: </strong>
              {invoice.invoiceNumber}
            </div>
            <div className="row date">
              <strong>Date: </strong>
              {moment.utc(order.createdDateTime).local().format("MMMM Do YYYY")}
            </div>
            <div className="row">
              <strong>PAN: </strong>
              {invoice.businessDetails.pan}
            </div>
            <div className="row">
              <strong>CIN: </strong>
              {invoice.businessDetails.cin}
            </div>
          </div>
          <div className="address">
            <div className="name">Billing Address: </div>
            <div>{order.customerName || "Name Not Available"},</div>
            <div className="value">{formatAddress(order.billingAddress)}</div>
          </div>
          <div className="address">
            <div className="name">Shipping Address: </div>
            <div>{order.customerName || "Name Not Available"},</div>
            <div className="value">{formatAddress(order.shippingAddress)}</div>
          </div>
        </section>
        <section className="section">
          <table className="productTable">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Qty</th>
                <th>Gross Amount</th>
                <th>Tax</th>
                <th>Discount</th>
                <th>Final Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: OrderItemInterface, index) => {
                const productName = item.productSnapshot.productName;
                const attributeValues = item.productSnapshot.attributeValues;
                const tax = item.taxDetails.totalTaxPaid;
                const price = item.actualPriceWithoutTax;
                const discount = item.totalDiscount;
                const finalAmount = item.discountedPrice;

                const classes = classNames({
                  cancelledOrder:
                    item.orderItemStatus === OrderStatus.CancelCompleted,
                });

                return (
                  <tr className={classes} key={index}>
                    <td></td>
                    <td className="productInfo">
                      <div className="productName">{productName}</div>
                      <div className="metaInformation">
                        <div>
                          {attributeValues
                            .map(
                              (attributeValue) =>
                                `${attributeValue.attributeName}: ${attributeValue.value}`
                            )
                            .join(" ")}
                        </div>
                        <div>Seller: {item.sellerName}</div>
                      </div>
                    </td>
                    <td>{formatNumber(item.qty)}</td>
                    <td>{formatPrice(price)}</td>
                    <td className="tax">
                      {formatPrice(tax)}
                      <div className="taxSplitContainer">
                        {item.taxDetails.taxSplits.map((taxSplit) => (
                          <div key={taxSplit.taxId} className="taxSplit">
                            <span className="name">
                              {taxSplit.taxName} ({taxSplit.taxPercentage}%) :
                            </span>
                            <span className="value">
                              {formatPrice(taxSplit.taxAmountPaid)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      {formatPrice(discount)}
                      {item.loanDetail && (
                        <div style={{ maxWidth: "180px", margin: "auto" }}>
                          (
                          <span>
                            Includes Loan Availed From{" "}
                            {item.loanDetail.providerName}:{" "}
                          </span>
                          {formatPrice(item.loanDetail.loanAmountChosen)})
                        </div>
                      )}
                    </td>
                    <td>{formatPrice(finalAmount)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        <section className="section priceSection">
          <table>
            <tbody>
              <tr>
                <td>Total</td>
                <td>{formatPrice(subTotal)}</td>
              </tr>
              <tr>
                <td>Shipping Fee</td>
                <td>{formatPrice(shippingFee)}</td>
              </tr>
              {order.discountSplits.map((discount, index) => (
                <tr key={index} className="discount">
                  <td>{discount.discountType}</td>
                  <td>- {formatPrice(discount.discountAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="section totalSection">
          <div>Net Total </div>
          <div className="total">{formatPrice(order.totalPrice)}</div>
        </section>
      </div>
      <footer>
        <img className="logoContainer" src={LogoIcon} alt="logo" />
        <div>
          <div className="line">Thank You for shopping with us!!</div>
        </div>
      </footer>
      {showWaterMark && (
        <div className="waterMarkContainer">
          <div className="waterMark">
            <div className="text">Pending</div>
            <div className="subText">(Credit Not Settled)</div>
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          background: white;
          max-width: 950px;
          margin: auto;
          box-shadow: 0 0 20px #00000014;
          counter-reset: rowCount;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .cancelledOrder {
          color: ${CSSConstants.dangerColor};
          text-decoration: solid line-through ${CSSConstants.dangerColor};
        }
        .title {
          font-size: 2.5rem;
          text-align: center;
          padding: 0.5em;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .row {
          display: grid;
          grid-template-columns: 80px 1fr;
          grid-column-gap: 0.3em;
          margin: 0.2em 0;
        }
        .sellerSection {
          max-width: 300px;
        }
        .waterMarkContainer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .waterMark {
          transform: rotate(-25deg);
          border: 2px solid ${CSSConstants.warningColor};
          border-radius: 0.8em;
          padding: 0.4em 1.2em;
        }
        .waterMark .text {
          font-size: 2.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${CSSConstants.warningColor};
          font-weight: bold;
        }
        .waterMark .subText {
          text-align: center;
          font-size: 1.3rem;
          color: ${CSSConstants.secondaryTextColor};
          font-weight: 500;
          margin-top: -0.3em;
        }
        .body {
          flex: 1;
        }
        .logoContainer {
          text-align: center;
          height: 1.5rem;
        }
        .productTable tbody tr td:first-child::before {
          counter-increment: rowCount;
          content: counter(rowCount);
        }
        .productInfo {
          text-align: initial;
          padding: 0.4em;
        }
        .productName {
          font-weight: 500;
        }
        .metaInformation {
          font-size: 0.9rem;
          margin: 0.3em 0;
        }
        .shopSection {
          text-align: center;
        }
        .section {
          padding: 0.7em 1.5em;
          box-sizing: border-box;
        }
        .address {
          max-width: 200px;
        }
        .address .name {
          font-weight: 700;
          margin-bottom: 0.3em;
        }
        .detailsSection {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 1.5em;
        }
        .productTable {
          margin: 3em 0 1em 0;
          width: 100%;
          text-align: center;
        }
        .productTable thead tr {
          border-bottom: 1px solid #666666;
        }
        th {
          color: #666666;
        }
        td {
          padding: 0.2em;
        }
        .tax {
          padding: 0.5em 0;
        }
        .taxSplitContainer {
          padding: 0.5em 0;
        }
        .taxSplit .name {
          font-weight: 500;
          display: inline-block;
          margin: 0 0.5em;
        }
        .priceSection {
          background-color: #e6e6e6;
        }
        .priceSection table {
          margin-left: auto;
        }
        .priceSection td {
          padding: 0.1em 1em;
        }
        .totalSection {
          margin-bottom: 1.5em;
          text-align: right;
        }
        .total {
          font-size: 1.5rem;
          color: #666666;
        }
        .discount {
          color: ${CSSConstants.successColor};
        }
        footer {
          padding: 1em;
          text-align: center;
        }
        @media (max-width: 800px) {
          .container {
            box-shadow: none;
          }
        }
      `}</style>
    </section>
  );
};

export default WithAuth(Invoice);
