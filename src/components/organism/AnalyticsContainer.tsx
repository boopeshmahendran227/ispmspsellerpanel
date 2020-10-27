import MetricCard from "components/atoms/MetricCard";
import RoundedIcon from "components/atoms/RoundedIcon";
import { formatPrice } from "utils/misc";
import RevenueLineChart, {
  MonthlySalesInterface,
} from "components/atoms/RevenueLineChart";
import OrderCountPieChart from "components/atoms/OrdersPieChart";
import TopSold, { TopSoldItem } from "components/molecules/TopSold";
import RecentOrderList from "components/molecules/RecentOrderList";
import CSSConstants from "../../constants/CSSConstants";
import useSWR from "swr";
import { PaginatedDataInterface } from "types/pagination";
import { OrderInterface } from "types/order";
import { SummaryInterface, PeriodState } from "types/insights";
import { EcosystemResponseInterface } from "types/business";
import PageError from "components/atoms/PageError";
import Loader from "components/atoms/Loader";
import moment from "moment";
import { Heading, Box, SimpleGrid, Divider } from "@chakra-ui/core";

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

  interface CardProps {
    title: string;
    gridColumn: string | string[];
    children: React.ReactNode;
  }

  const Card = (props: CardProps) => {
    const { title, gridColumn, children } = props;
    return (
      <Box
        bg="white"
        borderRadius={8}
        gridColumn={gridColumn}
        boxShadow="md"
        p={2}
      >
        <Heading size="md" p={4}>
          {title}
          <Divider />
        </Heading>
        <Box>{children}</Box>
      </Box>
    );
  };

  return (
    <SimpleGrid columns={[2, null, null, 5]} spacing={3}>
      <Box>
        <MetricCard
          title="Orders"
          icon={
            <RoundedIcon
              icon={<i className="fa fa-shopping-cart" aria-hidden="true"></i>}
              color="secondaryColorVariant"
            />
          }
          value={summary.totalOrderCount}
        />
      </Box>
      <Box>
        <MetricCard
          title="Customers"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-users"></i>}
              color="warningColorVariant"
            />
          }
          value={summary.totalCustomers}
        />
      </Box>
      <Box>
        <MetricCard
          title="Quotes"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-comments-dollar"></i>}
              color="dangerColorVariant"
            />
          }
          value={summary.totalQuotes}
        />
      </Box>
      <Box>
        <MetricCard
          title="Revenue"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-money-bill"></i>}
              color="successColorVariant"
            />
          }
          value={formatPrice(summary.totalRevenue)}
        />
      </Box>
      <Box>
        <MetricCard
          title="Ecosystems"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-store"></i>}
              color="primaryColorVariant"
            />
          }
          value={ecosystemData.length}
        />
      </Box>
      <Card title="Orders" gridColumn="1/3">
        <Box h="250px">
          <OrderCountPieChart data={summary} />
        </Box>
      </Card>
      <Card
        title="Revenue (Last 6 months)"
        gridColumn={["1/3", "1/3", "1/3", "3/6"]}
      >
        <Box h="250px">
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
      </Card>
      <Card title="Recent Orders" gridColumn={["1/3", "1/3", "1/3", "1/4"]}>
        <RecentOrderList orders={orders} />
      </Card>
      <Card title="Top Sold Products" gridColumn={["1/3", "1/3", "1/3", "4/6"]}>
        <TopSold data={topSelling} />
      </Card>
    </SimpleGrid>
  );
};

export default AnalyticsContainer;
