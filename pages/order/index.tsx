import { OrderInterface, OrderItemInterface } from "../../src/types/order";
import SortableTable from "../../src/components/SortableTable";
import moment from "moment";
import { formatPrice } from "../../src/utils/misc";
import OrderActions from "../../src/actions/order";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import { getOrders } from "../../src/selectors/order";
import { RequestReducerState } from "../../src/reducers/utils";
import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import ProductCard from "../../src/components/ProductCard";

interface StateProps {
  orders: OrderInterface[];
  getOrdersLoadingState: RequestReducerState;
}

interface DispatchProps {
  getOrders: () => void;
}

type QuotesProps = StateProps & DispatchProps;

const Orders = (props: QuotesProps) => {
  const { orders } = props;

  return (
    <div className="container">
      <header>Orders ({orders.length})</header>
      <SortableTable
        initialSortData={{
          index: 5,
          isAsc: true,
        }}
        headers={[
          {
            name: "Order Id",
            valueFunc: (order: OrderInterface) => order.id,
          },
          {
            name: "Customer Name",
            valueFunc: (order: OrderInterface) => null,
          },
          {
            name: "Products",
            valueFunc: (order: OrderItemInterface) => null,
          },
          {
            name: "Price",
            valueFunc: (order: OrderInterface) =>
              order.items
                .map((item) => item.discountedPrice)
                .reduce((acc, price) => acc + price, 0),
          },
          {
            name: "Status",
            valueFunc: (order: OrderInterface) => order.orderStatus,
          },
          {
            name: "Created",
            valueFunc: (order: OrderInterface) => order.createdDateTime,
          },
          {
            name: "Action",
            valueFunc: (order: OrderInterface) => null,
          },
        ]}
        data={orders}
        emptyMsg="There are no orders"
        body={(orders: OrderInterface[]) =>
          orders.map((order) => (
            <Link key={order.id} href="/order/[id]" as={`/order/${order.id}`}>
              <tr>
                <td>{order.id}</td>
                <td>Boopesh</td>
                <td>
                  {order.items.map((orderItem, index) => (
                    <div key={orderItem.id} className="productContainer">
                      <ProductCard
                        name={orderItem.productSnapshot.productName}
                        image={orderItem.productSnapshot.images[0]}
                        attributeValues={
                          orderItem.productSnapshot.attributeValues
                        }
                      />
                      <div className="infoGrid">
                        <span className="header">Order Status:</span>
                        <span className="value">
                          {orderItem.orderItemStatus}
                        </span>
                        <span className="header">Product Id: </span>
                        <span className="value">{orderItem.productId}</span>
                        <span className="header">Sku Id: </span>
                        <span className="value">{orderItem.skuId}</span>
                        <span className="header">Discounted Price: </span>
                        <span className="value">
                          {formatPrice(orderItem.discountedPrice)}
                        </span>
                        <span className="header">Discount: </span>
                        <span className="value">
                          {formatPrice(orderItem.totalDiscount)}
                        </span>
                        <span className="header">Quantity:</span>
                        <span className="value">{orderItem.qty}</span>
                        <span className="header">Tax:</span>
                        <span className="value">
                          {formatPrice(orderItem.tax)}
                        </span>
                      </div>
                    </div>
                  ))}
                </td>
                <td>
                  {formatPrice(
                    order.items
                      .map((item) => item.discountedPrice)
                      .reduce((acc, price) => acc + price, 0)
                  )}
                </td>
                <td>{order.orderStatus}</td>
                <td>
                  {moment
                    .utc(order.createdDateTime)
                    .local()
                    .format("MMMM Do YYYY, hh:mm A")}
                </td>
                <td>
                  <a>View</a>
                </td>
              </tr>
            </Link>
          ))
        }
      />
      <style jsx>{`
        .container {
          padding: 2em;
          max-width: 1300px;
          margin: 1em auto;
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        header {
          font-weight: 500;
          font-size: 1.2rem;
          padding: 0.5em;
        }
        .productContainer {
          text-align: initial;
          margin: 1em 0;
        }
        .infoGrid {
          margin: 0.2em;
          display: grid;
          grid-template-columns: auto auto;
          grid-gap: 0.1em;
        }
        .infoGrid .header {
          font-weight: 700;
        }
        tr:hover {
          background-color: ${CSSConstants.hoverColor};
          color: ${CSSConstants.hoverTextColor};
        }
        @media (max-width: 800px) {
          .container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  orders: getOrders(state),
  getOrdersLoadingState: state.order.order,
});

const mapDispatchToProps: DispatchProps = {
  getOrders: OrderActions.getOrders,
};

const mapPropsToLoadData = (props: QuotesProps) => {
  return [
    {
      data: props.orders,
      fetch: props.getOrders,
      loadingState: props.getOrdersLoadingState,
    },
  ];
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(Orders));
