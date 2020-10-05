import MetricCard from "./MetricCard";
import RoundedIcon from "./atoms/RoundedIcon";
import { formatPrice } from "utils/misc";
import RevenueLineChart, { MonthlySalesInterface } from "./RevenueLineChart";
import OrderCountPieChart from "./OrdersPieChart";
import TopSold, { TopSoldItem } from "./TopSold";
import RecentOrderList from "./RecentOrderList";
import CSSConstants from "../constants/CSSConstants";
import useSWR from "swr";
import { PaginatedDataInterface } from "types/pagination";
import { OrderInterface } from "types/order";
import { SummaryInterface, PeriodState } from "types/insights";
import { EcosystemResponseInterface } from "types/business";
import PageError from "./PageError";
import Loader from "./Loader";
import moment from "moment";

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

  return (
    <div>
      <div className="gridContainer">
        <div className="cardContainer1">
          <MetricCard
            title="Orders"
            icon={
              <RoundedIcon
                icon={
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                }
                color={CSSConstants.secondaryColor}
              />
            }
            value={summary.totalOrderCount}
          />
        </div>
        <div className="cardContainer2">
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
        </div>
        <div className="cardContainer3">
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
        </div>
        <div className="cardContainer4">
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
        </div>
        <div className="cardContainer5">
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
        </div>
        <div className="lineChartContainer">
          <div className="cardTitle">Revenue (Last 6 months)</div>
          <div className="lineChart">
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
          </div>
        </div>
        <div className="pieChartContainer">
          <div className="cardTitle">Orders</div>
          <div className="pieChart">
            <OrderCountPieChart data={summary} />
          </div>
        </div>
        <div className="topSoldContainer">
          <div className="cardTitle">Top Sold Products</div>
          <TopSold data={topSelling} />
        </div>
        <div className="recentOrderContainer">
          <div className="cardTitle"> Recent Orders</div>
          <RecentOrderList orders={orders}></RecentOrderList>
        </div>
      </div>
      <style jsx>{`
        .gridContainer {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-template-areas:
            "header header header header header"
            "metric1 metric2 metric3 metric4 metric5"
            "pieChart pieChart lineChart lineChart lineChart"
            "recent recent recent topSold topSold";
          grid-gap: 1.7em;
          margin-top: -1.7em;
          margin-bottom: 1em;
        }
        @media only screen and (max-width: 550px) {
          .gridContainer {
            display: grid;
            grid-template-columns: auto auto;
            grid-template-rows: 0.5fr 0.5fr 0.5fr auto auto auto auto;
            grid-template-areas:
              " header header "
              "metric1 metric2"
              "metric3 metric4"
              "pieChart pieChart "
              "lineChart lineChart "
              "recent recent "
              "topSold topSold";
            grid-row-gap: 1em;
            margin-bottom: 1em;
            margin-right: 2em;
          }
        }
        .cardContainer1 {
          grid-area: metric1;
        }
        .cardContainer2 {
          grid-area: metric2;
        }
        .cardContainer3 {
          grid-area: metric3;
        }
        .cardContainer4 {
          grid-area: metric4;
        }
        .cardContainer5 {
          grid-area: metric5;
        }
        .cardTitle {
          padding: 0.8em 1.1em;
          font-size: 1.5rem;
          font-weight: bold;
          border-bottom: 1px solid #f0f0f0;
        }
        .lineChartContainer {
          grid-area: lineChart;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          border-radius: 1em;
        }
        .lineChart {
          background: ${CSSConstants.foregroundColor};
          height: 250px;
          border-radius: 1em;
        }
        .pieChartContainer {
          grid-area: pieChart;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          border-radius: 1em;
        }
        .pieChart {
          background: ${CSSConstants.foregroundColor};
          height: 250px;
          border-radius: 1em;
        }
        .recentOrderContainer {
          grid-area: recent;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          border-radius: 1em;
        }
        .topSoldContainer {
          grid-area: topSold;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          border-radius: 1em;
        }
      `}</style>
    </div>
  );
};

export default AnalyticsContainer;
