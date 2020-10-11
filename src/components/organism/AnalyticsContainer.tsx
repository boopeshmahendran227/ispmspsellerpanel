import MetricCard from "../atoms/MetricCard";
import RoundedIcon from "../atoms/RoundedIcon";
import { formatPrice } from "utils/misc";
import RevenueLineChart, {
  MonthlySalesInterface,
} from "../atoms/RevenueLineChart";
import OrderCountPieChart from "../atoms/OrdersPieChart";
import TopSold, { TopSoldItem } from "../molecules/TopSold";
import RecentOrderList from "../molecules/RecentOrderList";
import CSSConstants from "../../constants/CSSConstants";
import useSWR from "swr";
import { PaginatedDataInterface } from "types/pagination";
import { OrderInterface } from "types/order";
import { SummaryInterface, PeriodState } from "types/insights";
import { EcosystemResponseInterface } from "types/business";
import PageError from "../atoms/PageError";
import Loader from "../atoms/Loader";
import moment from "moment";
import { Grid, Box, Heading, Divider } from "@chakra-ui/core";

const roundOff = (num: number) => {
  const length = num.toString().length;
  return Math.pow(10, length) / 4;
};

const getFilterData = (period: PeriodState): moment.Moment[] => {
  switch (period) {
    case PeriodState.week:
      return [
        moment().subtract(7, "days").startOf("day"),
        moment().endOf("day"),
      ];
    case PeriodState.lastMonth:
      return [
        moment().subtract(1, "months").startOf("day"),
        moment().endOf("day"),
      ];
    case PeriodState.last3Months:
      return [
        moment().subtract(3, "months").startOf("day"),
        moment().endOf("day"),
      ];
  }
};

interface AnalyticsContainerProps {
  period: PeriodState;
}

const CardTitle = (props) => (
  <>
    <Heading px={3} py={2} fontSize="xl">
      {props.children}
    </Heading>
    <Divider />
  </>
);

const AnalyticsContainer = (props: AnalyticsContainerProps): JSX.Element => {
  const { period } = props;
  const orderSWR = useSWR("/order?pageSize=6");
  const orderData: PaginatedDataInterface<OrderInterface> = orderSWR.data;

  const [startDate, endDate] = getFilterData(period);

  const topSellingSWR = useSWR(
    `/reports/seller/topSelling?start=${startDate
      .utc()
      .format()}&end=${endDate.utc().format()}`
  );
  const topSelling: TopSoldItem[] = topSellingSWR.data;

  const summarySWR = useSWR(
    `/reports/seller/summary?start=${startDate
      .utc()
      .format()}&end=${endDate.utc().format()}`
  );
  const summary: SummaryInterface = summarySWR.data;
  const monthlySalesSWR = useSWR(
    `/reports/seller/monthlysales?start=${moment()
      .subtract(6, "months")
      .startOf("day")
      .utc()
      .format()}&end=${moment().endOf("day").utc().format()}`
  );
  const monthlySales: MonthlySalesInterface[] = monthlySalesSWR.data;

  const businessSWR = useSWR("/businesses/ecosystems/all");
  const ecosystemData: EcosystemResponseInterface = businessSWR.data;

  const error =
    summarySWR.error ||
    orderSWR.error ||
    topSellingSWR.error ||
    monthlySalesSWR.error ||
    businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (
    !summary ||
    !orderData ||
    !topSelling ||
    !monthlySales ||
    !ecosystemData
  ) {
    return <Loader />;
  }

  const orders: OrderInterface[] = orderData.results;

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      templateRows="1fr 3fr 5fr"
      gap={5}
      mt="-1.7em"
      mb={3}
    >
      <Box gridRow="1/2" gridColumn="1/2">
        <MetricCard
          title="Orders"
          icon={
            <RoundedIcon
              icon={<i className="fa fa-shopping-cart" aria-hidden="true"></i>}
              color={CSSConstants.secondaryColor}
            />
          }
          value={summary.totalOrderCount}
        />
      </Box>
      <Box gridRow="1/2" gridColumn="2/3">
        <MetricCard
          title="Customers"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-users"></i>}
              color={CSSConstants.warningColor}
            />
          }
          value={summary.totalCustomers}
        />
      </Box>
      <Box gridRow="1/2" gridColumn="3/4">
        <MetricCard
          title="Quotes"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-comments-dollar"></i>}
              color={CSSConstants.dangerColor}
            />
          }
          value={summary.totalQuotes}
        />
      </Box>
      <Box gridRow="1/2" gridColumn="4/5">
        <MetricCard
          title="Revenue"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-money-bill"></i>}
              color={CSSConstants.successColor}
            />
          }
          value={formatPrice(summary.totalRevenue)}
        />
      </Box>
      <Box gridRow="1/2" gridColumn="5/6">
        <MetricCard
          title="Ecosystems"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-store"></i>}
              color={CSSConstants.primaryColor}
            />
          }
          value={ecosystemData.length}
        />
      </Box>
      <Box
        gridRow="2/3"
        gridColumn="3/6"
        bg="foregroundColor"
        rounded={10}
        boxShadow="md"
      >
        <CardTitle>Revenue (Last 6 months)</CardTitle>
        <RevenueLineChart
          revenueData={monthlySales}
          interval={roundOff(
            Math.round(
              monthlySales
                .map((item) => item.revenue)
                .reduce((a, b) => (a > b ? a : b)) / 4
            )
          )}
        />
      </Box>
      <Box
        gridRow="2/3"
        gridColumn="1/3"
        bg="foregroundColor"
        rounded={10}
        boxShadow="md"
      >
        <CardTitle>Orders</CardTitle>
        <OrderCountPieChart data={summary} />
      </Box>
      <Box
        gridRow="3/4"
        gridColumn="4/6"
        bg="foregroundColor"
        rounded={10}
        boxShadow="md"
      >
        <CardTitle>Top Sold Products</CardTitle>
        <TopSold data={topSelling} />
      </Box>
      <Box
        gridRow="3/4"
        gridColumn="1/4"
        bg="foregroundColor"
        rounded={10}
        boxShadow="md"
      >
        <CardTitle> Recent Orders</CardTitle>
        <RecentOrderList orders={orders}></RecentOrderList>
      </Box>
    </Grid>
  );
};

export default AnalyticsContainer;
