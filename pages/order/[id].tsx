import moment from "moment";
import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "../../src/components/Loader";
import OrderItem from "../../src/components/OrderItem";
import { splitCamelCase, formatAddress } from "../../src/utils/misc";

const Order = () => {
  const router = useRouter();
  const { data: order } = useSWR(`/order/${router.query.id}`);

  if (!order) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Link href="/order">
        <a className="backBtn">
          <i className="icon fas fa-chevron-left"></i> Back to Orders
        </a>
      </Link>
      <header>
        <span className="id">#{order.id}</span>{" "}
        <span className="time">
          {moment
            .utc(order.createdDateTime)
            .local()
            .format("MMMM Do YYYY h:mm a")}
        </span>{" "}
        <span className="status">{splitCamelCase(order.orderStatus)}</span>
      </header>
      <div className="flexContainer">
        <div className="col1">
          <section className="itemContainer">
            {order.items.map((orderItem) => (
              <OrderItem orderItem={orderItem} />
            ))}
          </section>
        </div>
        <div className="col2">
          <section className="customerContainer">
            <div className="header">Customer Information</div>
            <div className="row">
              <div className="name">Name</div>
              <div className="value">Boopesh</div>
            </div>
            <div className="row">
              <div className="name">Billing Address</div>
              <div className="value">{formatAddress(order.billingAddress)}</div>
            </div>
            <div className="row">
              <div className="name">Shipping Address</div>
              <div className="value">
                {formatAddress(order.shippingAddress)}
              </div>
            </div>
          </section>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 1em auto;
          max-width: 1100px;
        }
        .flexContainer {
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-gap: 1em;
        }
        .col1 {
          flex: 1;
        }
        header .id {
          font-size: 1.6rem;
        }
        header {
          margin: 1.4em 0;
        }
        .time {
          color: ${CSSConstants.secondaryTextColor};
        }
        .status {
          border-radius: 2em;
          display: inline-block;
          background: ${CSSConstants.primaryColor};
          padding: 0.2em 0.5em;
          color: white;
          margin: 0 0.3em;
        }
        .customerContainer {
          background: ${CSSConstants.foregroundColor};
          border: ${CSSConstants.borderStyle};
        }
        .customerContainer .header {
          font-size: 1.3rem;
          padding: 0.3em 0.8em;
          margin: 0.4em 0;
        }
        .row {
          border-bottom: ${CSSConstants.borderStyle};
        }
        .name {
          padding: 0.8em;
          margin-top: 0.4em;
          font-weight: bold;
        }
        .value {
          padding-bottom: 0.4em;
          padding-left: 0.8em;
          padding-right: 0.8em;
        }
        .backBtn {
          display: inline-block;
          cursor: pointer;
          margin: 1em 0;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default Order;
