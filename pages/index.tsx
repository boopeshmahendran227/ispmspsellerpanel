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
import QuoteActions from "../src/actions/quote";
import { getQuotes } from "../src/selectors/quote";

interface StateProps {
  orders: OrderInterface[];
  orderItems: OrderItemInterface[];
  quotes: QuoteInterface[];
  getQuotesLoadingState: RequestReducerState;
  getOrdersLoadingState: RequestReducerState;
}

interface DispatchProps {
  getOrders: () => void;
  getQuotes: () => void;
}

type HomeProps = StateProps & DispatchProps;

const Home = (props: HomeProps) => (
  <div>
    <div>
      <MetricCard title="Orders" value={props.orderItems?.length || 0} />
      <MetricCard title="Quotes" value={props.quotes?.length || 0} />
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

const mapStateToProps = (state: RootState): StateProps => ({
  orders: getOrders(state),
  orderItems: getOrderItems(state),
  quotes: getQuotes(state),
  getOrdersLoadingState: state.order.order,
  getQuotesLoadingState: state.quote.quote,
});

const mapDispatchToProps: DispatchProps = {
  getOrders: OrderActions.getOrders,
  getQuotes: QuoteActions.getQuotes,
};

const mapPropsToLoadData = (props: HomeProps) => {
  return [
    {
      data: props.orders,
      fetch: props.getOrders,
      loadingState: props.getOrdersLoadingState,
    },
    {
      data: props.quotes,
      fetch: props.getQuotes,
      loadingState: props.getQuotesLoadingState,
    },
  ];
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(WithReduxDataLoader(mapPropsToLoadData)(Home));
