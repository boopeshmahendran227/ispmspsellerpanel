import MetricCard from "../src/components/MetricCard";
import { SummaryInterface } from "../src/types/insights";
import useSWR from "swr";
import React, { useState } from "react";
import Loader from "../src/components/Loader";
import PageError from "../src/components/PageError";
import WithAuth from "../src/components/WithAuth";
import moment from "moment";
import { formatPrice } from "../src/utils/misc";
import CSSConstants from "../src/constants/CSSConstants";
import Select from "../src/components/Select";
import { SelectOptionInterface } from "../src/types/product";
import RecentOrders from "../src/components/RecentOrders";
import TopSold, { TopSoldItems } from "../src/components/TopSold";
import PercentageArrow from "../src/components/PercentArrow";
import RevenueLineChart, {
  formatLineData,
} from "../src/components/RevenueLineChart";
import { percentageDifference } from "../src/components/RevenueLineChart";
import OrderCountPieChart from "../src/components/OrdersPieChart";
import { OrderInterface } from "../src/types/order";

enum PeriodState {
  week,
  year,
}
const filter: SelectOptionInterface[] = [
  {
    value: PeriodState.week,
    label: "This week",
  },

  {
    value: PeriodState.year,
    label: "This year",
  },
];
const roundOff = (num: number) => {
  const length = num.toString().length;
  return Math.pow(10, length) / 4;
};

const Home = (): JSX.Element => {
  const [period, setPeriod] = useState(filter[0]);
  const weekStart = moment().subtract(7, "days").startOf("day");
  const yearStart = moment().subtract(1, "years").startOf("day");
  const halfYearStart = moment().subtract(6, "months").startOf("day");
  const endDate = moment().endOf("day");

  const orderSWR = useSWR("/order?pageSize=6");
  const orderData: OrderInterface = orderSWR.data.results;

  const topSellingSWR = useSWR(
    period.value === PeriodState.week
      ? `/reports/seller/topSelling?start=${weekStart
          .utc()
          .format()}&end=${endDate.utc().format()}`
      : `/reports/seller/topSelling?start=${yearStart
          .utc()
          .format()}&end=${endDate.utc().format()}`
  );
  const topSelling: TopSoldItems[] = topSellingSWR.data;

  const summarySWR = useSWR(
    period.value === PeriodState.week
      ? `/reports/seller/summary?start=${weekStart
          .utc()
          .format()}&end=${endDate.utc().format()}`
      : `/reports/seller/summary?start=${yearStart
          .utc()
          .format()}&end=${endDate.utc().format()}`
  );
  const summary: SummaryInterface = summarySWR.data;
  const monthlySalesSWR = useSWR(
    `/reports/seller/monthlysales?start=${halfYearStart
      .utc()
      .format()}&end=${endDate.utc().format()}`
  );
  const monthlySales = monthlySalesSWR.data;

  const error =
    summarySWR.error ||
    orderSWR.error ||
    topSellingSWR.error ||
    monthlySalesSWR.error;
  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!summary || !orderData || !topSelling || !monthlySales) {
    return <Loader />;
  }

  return (
    <div className="gridContainer">
      <header>
        <h3 className="title">
          <i className="fa fa-chart-area"></i> Analytics
        </h3>

        <div className="select">
          <Select
            value={period}
            options={filter}
            onChange={(value) => setPeriod(value)}
          />
        </div>
      </header>
      <div className="cardContainer1">
        <MetricCard
          title={
            <span>
              Total orders <i className="fa fa-chart-bar"></i>
            </span>
          }
          value={summary.totalOrderCount}
        />
      </div>
      <div className="cardContainer2">
        <MetricCard
          title={
            <span>
              Customers <i className="fas fa-users"></i>
            </span>
          }
          value={summary.totalCustomers}
        />
      </div>
      <div className="cardContainer3">
        <MetricCard
          title={
            <span>
              Total Quotes <i className="fas fa-comments-dollar"></i>
            </span>
          }
          value={summary.totalQuotes}
        />
      </div>
      <div className="cardContainer4">
        <MetricCard
          title={
            <span>
              Revenue <i className="fas fa-hand-holding-usd"></i>
            </span>
          }
          value={formatPrice(summary.totalRevenue)}
        />
      </div>
      <div className="lineChartContainer">
        <h4 className="title">Revenue</h4>
        <PercentageArrow
          value={percentageDifference(formatLineData(monthlySales)[0].data)}
        />
        <div className="lineChart">
          <RevenueLineChart
            revenueData={monthlySales}
            intervel={roundOff(
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
        <h4 className="title">Orders</h4>
        {/* <PercentageArrow value={8} /> */}
        <div className="pieChart">
          <OrderCountPieChart data={summary} />
        </div>
      </div>
      <div className="topSoldContainer">
        <h4 className="title">Top Sold</h4>
        <TopSold data={topSelling} />
      </div>
      <div className="recentOrderContainer">
        <h4 className="title"> Recent Orders</h4>
        <RecentOrders data={orderData}></RecentOrders>
      </div>
      <style jsx>{`
        .gridContainer {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr auto auto;
          grid-template-rows: 0.3fr 0.5fr 2fr auto;
          grid-template-areas:
            " header header header header header  "
            "metric1 metric2 metric3 metric4 metric4"
            "pieChart pieChart lineChart lineChart lineChart "
            "recent recent recent recent topSold ";
          grid-row-gap: 0.5em;
          grid-column-gap: 0.5em;
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
        header {
          grid-area: header;
          display: grid;
          grid-template-columns: 4fr 1fr;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          align-items: center;
          border-radius: 1em;
          margin-top: 1em;
          padding-right: 1em;
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
        i {
          margin-left: 0.3em;
        }

        .title {
          margin: 0.5em 0;
          font-size: 1.7em;
          padding: 0 0.5em;
        }

        .lineChartContainer {
          grid-area: lineChart;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          border-radius: 1em;
          margin-right: 1em;
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
          margin: 0em 1em;
        }

        .pieChart {
          background: ${CSSConstants.foregroundColor};
          height: 250px;
          border-radius: 1em;
        }

        .recentOrderContainer {
          grid-area: recent;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 30px #00000014;
          border-radius: 1em;
          margin: 1em 1em;
        }
        .topSoldContainer {
          grid-area: topSold;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 30px #00000014;
          border-radius: 1em;
          margin: 1em 1em 1em 0em;
        }
      `}</style>
    </div>
  );
};

export default WithAuth(Home);
