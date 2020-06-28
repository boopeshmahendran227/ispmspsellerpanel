import MetricCard from "../src/components/MetricCard";
import { connect } from "react-redux";
import { RootState } from "../src/reducers";
import { RequestReducerState } from "../src/reducers/utils";
import { QuoteInterface } from "../src/types/quote";
import { OrderInterface, OrderItemInterface } from "../src/types/order";
import { getOrderItems, getOrders } from "../src/selectors/order";
import WithReduxDataLoader from "../src/components/WithReduxDataLoader";
import OrderActions from "../src/actions/order";
import useSWR from "swr";
import Loader from "../src/components/Loader";
import PageError from "../src/components/PageError";
import { BusinessDataInterface } from "../src/types/business";

interface StateProps {
  orders: OrderInterface[];
  orderItems: OrderItemInterface[];
  getOrdersLoadingState: RequestReducerState;
}

interface DispatchProps {
  getOrders: () => void;
}

type HomeProps = StateProps & DispatchProps;

const Home = (props: HomeProps) => {
  const quotesSWR = useSWR("/quote");
  const businessSWR = useSWR("/businesses/business");
  const quotes: QuoteInterface[] = quotesSWR.data;
  const businessData: BusinessDataInterface = businessSWR.data;

  const error = quotesSWR.error || businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!quotes || !businessData) {
    return <Loader />;
  }

  return (
    <div>
      <MetricCard title="Orders" value={props.orderItems.length} />
      <MetricCard title="Quotes" value={quotes.length} />
      <MetricCard title="Ecosystems" value={businessData.ecosystems.length} />
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  orders: getOrders(state),
  orderItems: getOrderItems(state),
  getOrdersLoadingState: state.order.order,
});

const mapDispatchToProps: DispatchProps = {
  getOrders: OrderActions.getOrders,
};

const mapPropsToLoadData = (props: HomeProps) => {
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
)(WithReduxDataLoader(mapPropsToLoadData)(Home));
