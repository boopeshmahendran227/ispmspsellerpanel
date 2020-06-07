import moment from "moment";
import Feedback from "../../../src/components/Feedback";
import Strings from "../../../strings";
import {
  formatPrice,
  formatAddress,
  formatNumber,
} from "../../../src/utils/misc";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "../../../src/components/Loader";
import PageError from "../../../src/components/PageError";
import { OrderDetailInterface } from "../../../src/types/order";
import { transformOrderItem } from "../../../src/transformers/orderItem";

// images
import LogoImg from "../../../public/icons/logo.png";

const Invoice = () => {
  const router = useRouter();

  const swr = useSWR(`/order/${router.query.orderId}`);
  const order: OrderDetailInterface = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!order) {
    return <Loader />;
  }

  const orderItem = transformOrderItem(
    order,
    order.items.find(
      (orderItem) => orderItem.id === Number(router.query.orderItemId)
    )
  );

  const productName = orderItem.productSnapshot.productName;
  const attributeValues = orderItem.productSnapshot.attributeValues;
  const tax = orderItem.taxDetails.totalTaxPaid * orderItem.qty;
  const price = orderItem.actualPriceWithoutTax * orderItem.qty;
  const discount = orderItem.totalDiscount;
  const finalAmount = orderItem.discountedPrice;

  return (
    <section className="container">
      <div className="body">
        <div className="logoContainer">
          <img src={LogoImg} />
        </div>
        <section className="section shopSection">
          <div>{Strings.ADDRESS}</div>
        </section>
        <section className="section detailsSection">
          <div>
            <div className="date">
              <strong>Date: </strong>
              {moment.utc(order.createdDateTime).local().format("MMMM Do YYYY")}
            </div>
            <div className="invoiceNumber">
              <strong>Invoice No: </strong>
              {order.id}
            </div>
          </div>
          <div className="address">
            <div className="name">Billing Address: </div>
            <div className="value">{formatAddress(order.billingAddress)}</div>
          </div>
          <div className="address">
            <div className="name">Shipping Address: </div>
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
                <th>Price</th>
                <th>Discount</th>
                <th>Tax</th>
                <th>Final Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                    <div>Seller: {orderItem.sellerName}</div>
                  </div>
                </td>
                <td>{formatNumber(orderItem.qty)}</td>
                <td>{formatPrice(price)}</td>
                <td>{formatPrice(discount)}</td>
                <td className="tax">
                  {formatPrice(tax)}
                  <div className="taxSplitContainer">
                    {orderItem.taxDetails.taxSplits.map((taxSplit) => (
                      <div className="taxSplit">
                        <span className="name">{taxSplit.taxName}:</span>
                        <span className="value">
                          {formatPrice(taxSplit.taxAmountPaid * orderItem.qty)}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td>{formatPrice(finalAmount)}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="section priceSection">
          <table>
            <tbody>
              <tr>
                <td>Total</td>
                <td>{formatPrice(orderItem.finalPrice)}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="section totalSection">
          <div>Net Total </div>
          <div className="total">{formatPrice(orderItem.finalPrice)}</div>
        </section>
        <Feedback orderId={order.id} />
      </div>
      <footer>
        <div>
          <div className="line">Thank You for shopping with us!!</div>
        </div>
      </footer>
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
        .body {
          flex: 1;
        }
        .logoContainer {
          text-align: center;
          padding: 0.5em;
          font-size: 1.8rem;
          font-weight: 700;
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
        .priceSection .tax,
        .priceSection .discount {
          font-size: 0.9rem;
          padding-left: 1.2em;
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

export default Invoice;
