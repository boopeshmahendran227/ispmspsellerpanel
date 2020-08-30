import MetricCard from "components/MetricCard";
import useSWR from "swr";
import Loader from "components/Loader";
import PageError from "components/PageError";
import { BusinessDataInterface } from "types/business";
import WithAuth from "components/WithAuth";
import moment from "moment";
import { SummaryInterface } from "types/insights";
import { formatPrice } from "utils/misc";
import RoundedIcon from "components/atoms/RoundedIcon";
import CSSConstants from "../src/constants/CSSConstants";

const startDate = moment().subtract(7, "days").startOf("day");
const endDate = moment().endOf("day");
const Insight = () => {
  const summarySWR = useSWR(
    `/reports/seller/summary?start=${startDate
      .utc()
      .format()}&end=${endDate.utc().format()}`
  );
  const businessSWR = useSWR("/businesses/business");
  const summary: SummaryInterface = summarySWR.data;
  const businessData: BusinessDataInterface = businessSWR.data;

  const error = summarySWR.error || businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!summary || !businessData) {
    return <Loader />;
  }

  return (
    <div className="container">
      <h2>Stats for Last 7 Days</h2>
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
      <style jsx>{`
        .container {
          margin: 1.5em 1em;
        }
      `}</style>
    </div>
  );
};

export default WithAuth(Insight);
