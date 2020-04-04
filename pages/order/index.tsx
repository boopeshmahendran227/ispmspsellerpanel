import { OrderInterface, OrderItemInterface } from "../../src/types/order";
import RelativeImg from "../../src/components/RelativeImg";
import SortableTable from "../../src/components/SortableTable";
import moment from "moment";
import { formatPrice } from "../../src/utils/misc";
import OrderActions from "../../src/actions/order";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import { getOrders } from "../../src/selectors/order";
import { RequestReducerState } from "../../src/reducers/utils";

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
          index: 6,
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
            name: "Shipping Address",
            valueFunc: (order: OrderInterface) => null,
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
        ]}
        data={orders}
        emptyMsg="There are no orders"
        body={(orders: OrderInterface[]) =>
          orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>Boopesh</td>
              <td>
                {order.items.map((orderItem, index) => (
                  <div key={orderItem.id} className="productContainer">
                    <div className="infoContainer">
                      <div className="count">{index + 1}.</div>
                      <div className="imageContainer">
                        <RelativeImg
                          src={orderItem.productSnapshot.images[0]}
                        ></RelativeImg>
                      </div>
                      <div className="contentContainer">
                        <a className="name">
                          {orderItem.productSnapshot.productName}
                        </a>
                        <div>
                          {orderItem.productSnapshot.attributeValues
                            .map(
                              (attributeValue) =>
                                `${attributeValue.attributeName}: ${attributeValue.value}`
                            )
                            .join(" ")}
                        </div>
                      </div>
                    </div>
                    <div className="infoGrid">
                      <span className="header">Order Status:</span>
                      <span className="value">{orderItem.orderItemStatus}</span>
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
              <td></td>
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
            </tr>
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
        .count {
          font-weight: 700;
        }
        .infoContainer {
          display: flex;
        }
        .count,
        .infoGrid {
          margin: 0.3em 0.5em;
        }
        .infoGrid {
          margin: 0.3em 1.6em;
          display: grid;
          grid-template-columns: auto auto;
          grid-gap: 0.1em;
        }
        .infoGrid .header {
          font-weight: 700;
        }
        .name {
          font-weight: 700;
          font-size: 1rem;
        }
        .imageContainer {
          width: 7rem;
          text-align: center;
          padding: 0.5em;
          padding-left: 0;
        }
        .contentContainer {
          padding-top: 1em;
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
