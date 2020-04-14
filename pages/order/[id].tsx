import moment from "moment";
import { AddressInterface } from "../../src/types/order";
import CSSConstants from "../../src/constants/CSSConstants";
import { OrderItemInterface } from "../../src/types/order";
import SortableTable from "../../src/components/SortableTable";
import { formatPrice } from "../../src/utils/misc";
import ProductCard from "../../src/components/ProductCard";
import Link from "next/link";
import ChangeStatusModal from "../../src/components/ChangeStatusModal";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "../../src/components/Loader";
import api from "../../src/api";

const formatAddress = (address: AddressInterface) => {
  return `${address.addressLine1} , ${address.addressLine2}, ${address.city} - ${address.zipCode}, ${address.state}`;
};

const Order = () => {
  const router = useRouter();
  const { data: order } = useSWR(`/order/${router.query.id}`, api);
  const [currentOrderItem, setCurrentOrderItem] = useState(null);
  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);

  const handleChangeStatus = (orderItem: OrderItemInterface) => {
    setCurrentOrderItem(orderItem);
    setChangeStatusModalOpen(true);
  };

  if (!order) {
    return <Loader />;
  }

  return (
    <div className="card">
      <ChangeStatusModal
        order={order}
        orderItem={currentOrderItem}
        open={changeStatusModalOpen}
        onClose={() => setChangeStatusModalOpen(false)}
      />
      <Link href="/order">
        <a className="backBtn">
          <i className="icon fas fa-chevron-left"></i> Back to Orders
        </a>
      </Link>
      <header>Order {order.id}</header>
      <section className="container">
        <section className="orderInfoContainer">
          <div className="subHeader">Order Information</div>
          <div className="body">
            <div className="row">
              <div className="name">Order Date:</div>
              <div className="value">
                {moment
                  .utc(order.createdDateTime)
                  .local()
                  .format("MMMM Do YYYY, hh:mm A")}
              </div>
            </div>
            <div className="row">
              <div className="name">Order Status:</div>
              <div className="value">{order.orderStatus}</div>
            </div>
          </div>
        </section>
        <section className="addressContainer">
          <div className="subHeader">Address Information</div>
          <div className="body">
            <div className="address">
              <div className="name">Billing Address</div>
              <div className="value">{formatAddress(order.billingAddress)}</div>
            </div>
            <div className="address">
              <div className="name">Shipping Address</div>
              <div className="value">
                {formatAddress(order.shippingAddress)}
              </div>
            </div>
          </div>
        </section>
        <section className="itemContainer">
          <div className="subHeader">Items</div>
          <div className="body">
            <SortableTable
              initialSortData={{
                index: 0,
                isAsc: false,
              }}
              headers={[
                {
                  name: "Product",
                  valueFunc: (orderItem: OrderItemInterface) => null,
                },
                {
                  name: "Product Id",
                  valueFunc: (orderItem: OrderItemInterface) =>
                    orderItem.productId,
                },
                {
                  name: "Sku Id",
                  valueFunc: (orderItem: OrderItemInterface) => orderItem.skuId,
                },
                {
                  name: "Quantity",
                  valueFunc: (orderItem: OrderItemInterface) => orderItem.qty,
                },
                {
                  name: "Actual Price",
                  valueFunc: (orderItem: OrderItemInterface) =>
                    orderItem.actualPrice,
                },
                {
                  name: "Discounted Price",
                  valueFunc: (orderItem: OrderItemInterface) =>
                    orderItem.discountedPrice,
                },
                {
                  name: "Discount",
                  valueFunc: (orderItem: OrderItemInterface) =>
                    orderItem.totalDiscount,
                },
                {
                  name: "Tax",
                  valueFunc: (orderItem: OrderItemInterface) => orderItem.tax,
                },
                {
                  name: "Status",
                  valueFunc: (orderItem: OrderItemInterface) =>
                    orderItem.orderItemStatus,
                },
                {
                  name: "Action",
                  valueFunc: (orderItem: OrderItemInterface) => null,
                },
              ]}
              data={order.items}
              emptyMsg="There are no orders"
              body={(orderItems: OrderItemInterface[]) =>
                orderItems.map((orderItem) => (
                  <tr>
                    <td>
                      <ProductCard
                        name={orderItem.productSnapshot.productName}
                        image={orderItem.productSnapshot.images[0]}
                        attributeValues={
                          orderItem.productSnapshot.attributeValues
                        }
                      />
                    </td>
                    <td>{orderItem.productId}</td>
                    <td>{orderItem.skuId}</td>
                    <td>{orderItem.qty}</td>
                    <td>{formatPrice(orderItem.actualPrice)}</td>
                    <td>{formatPrice(orderItem.discountedPrice)}</td>
                    <td>{formatPrice(orderItem.totalDiscount)}</td>
                    <td>{formatPrice(orderItem.tax)}</td>
                    <td>{orderItem.orderItemStatus}</td>
                    <td>
                      <a
                        className="changeStatusLink"
                        onClick={() => handleChangeStatus(orderItem)}
                      >
                        Change Status
                      </a>
                    </td>
                  </tr>
                ))
              }
            />
          </div>
        </section>
      </section>
      <style jsx>{`
        .card {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          margin: 1em auto;
          background: white;
          max-width: 1300px;
          padding: 1em 1.5em;
        }
        .container {
          padding: 0 1.8em;
        }
        header {
          font-size: 1.6rem;
          border-bottom: ${CSSConstants.borderStyle};
          padding: 0.3em 0;
        }
        .subHeader {
          font-size: 1.3rem;
          padding: 0.3em 0;
          margin: 0.4em 0;
          border-bottom: ${CSSConstants.borderStyle};
        }
        .addressContainer .body {
          display: flex;
        }
        .address .name {
          font-weight: 700;
          margin-bottom: 0.3em;
        }
        .address {
          margin: 0.3em 0;
          flex: 1;
        }
        .orderInfoContainer,
        .addressContainer {
          margin-top: 1.5em;
          margin-bottom: 4em;
        }
        .orderInfoContainer .name {
          font-weight: 700;
        }
        .orderInfoContainer .row {
          display: grid;
          grid-template-columns: 120px auto;
          margin: 0.3em 0;
        }
        .backBtn {
          display: inline-block;
          cursor: pointer;
          margin: 1em 0;
          font-size: 1.1rem;
        }
        .changeStatusLink {
          color: ${CSSConstants.primaryColor};
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Order;
