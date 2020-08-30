import { SummaryInterface } from "types/insights";
import useSWR from "swr";
import React, { useState } from "react";
import Loader from "components/Loader";
import PageError from "components/PageError";
import WithAuth from "components/WithAuth";
import moment from "moment";
import { formatPrice } from "utils/misc";
import CSSConstants from "../src/constants/CSSConstants";
import Select from "components/Select";
import { SelectOptionInterface } from "types/product";
import RecentOrders from "components/RecentOrders";
import TopSold, { TopSoldItems } from "components/TopSold";
import PercentageArrow from "components/PercentArrow";
import RevenueLineChart, {
  formatLineData,
  MonthlySalesInterface,
} from "components/RevenueLineChart";
import { percentageDifference } from "components/RevenueLineChart";
import OrderCountPieChart from "components/OrdersPieChart";
import { OrderInterface } from "types/order";
import { PaginatedDataInterface } from "types/pagination";
import MetricCard from "components/MetricCard";
import RoundedIcon from "components/atoms/RoundedIcon";
import { BusinessDataInterface } from "types/business";

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
  const orderData: PaginatedDataInterface<OrderInterface> = orderSWR.data;

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
  const monthlySales: MonthlySalesInterface[] = monthlySalesSWR.data;

  const businessSWR = useSWR("/businesses/business");
  const businessData: BusinessDataInterface = businessSWR.data;

  const error =
    summarySWR.error ||
    orderSWR.error ||
    topSellingSWR.error ||
    monthlySalesSWR.error ||
    businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!summary || !orderData || !topSelling || !monthlySales) {
    return <Loader />;
  }

  const orders: OrderInterface[] = orderData.results;

  return (
    <div className="gridContainer">
      <header>
        <h3 className="title">Analytic Overview</h3>
        <div className="selectContainer">
          <Select
            value={period}
            options={filter}
            onChange={(value) => setPeriod(value)}
          />
        </div>
      </header>
      <div className="cardContainer1">
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
      </div>
      <div className="cardContainer2">
        <MetricCard
          title="Customers"
          icon={
            <RoundedIcon
              icon={<i className="fas fa-users"></i>}
              color={CSSConstants.dangerColor}
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
              color={CSSConstants.warningColor}
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
          value={businessData.ecosystems.length}
        />
      </div>
      <div className="lineChartContainer">
        <div className="cardTitle">Revenue</div>
        <PercentageArrow
          value={percentageDifference(formatLineData(monthlySales)[0].data)}
        />
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
        <div className="cardTitle">Top Sold</div>
        <TopSold data={topSelling} />
      </div>
      <div className="recentOrderContainer">
        <div className="cardTitle"> Recent Orders</div>
        <RecentOrders orders={orders}></RecentOrders>
      </div>
      <style jsx>{`
        .gridContainer {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-template-rows: 0.3fr 0.5fr 2fr auto;
          grid-template-areas:
            "header header header header header"
            "metric1 metric2 metric3 metric4 metric5"
            "pieChart pieChart lineChart lineChart lineChart"
            "recent recent recent recent topSold";
          grid-gap: 1em;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1em;
          padding-right: 1em;
        }
        .selectContainer {
          min-width: 150px;
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
        .title {
          margin: 0.5em;
          padding: 0.3em;
          font-size: 1.7rem;
        }
        .cardTitle {
          padding: 0.7em 1.1em;
          font-size: 1.5rem;
          font-weight: bold;
          border-bottom: 1px solid #f0f0f0;
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
