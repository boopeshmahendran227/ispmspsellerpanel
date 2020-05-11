import MetricCard from "../src/components/MetricCard";
import CancellationRequestContainer from "../src/components/CancellationRequestContainer";
import TabSection from "../src/components/TabSection";
import ReturnRequestContainer from "../src/components/ReturnRequestContainer";
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
import Error from "next/error";

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
  const swr = useSWR("/quote");
  const quotes: QuoteInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!quotes) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <MetricCard title="Orders" value={props.orderItems?.length || 0} />
        <MetricCard title="Quotes" value={quotes?.length || 0} />
      </div>
      <div>
        <TabSection
          headingList={["Cancellation Requests", "Return Requests"]}
          contentList={[
            <CancellationRequestContainer />,
            <ReturnRequestContainer />,
          ]}
        />
      </div>
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
