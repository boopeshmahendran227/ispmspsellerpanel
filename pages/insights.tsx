import MetricCard from "../src/components/MetricCard";
import useSWR from "swr";
import Loader from "../src/components/Loader";
import PageError from "../src/components/PageError";
import { BusinessDataInterface } from "../src/types/business";
import WithAuth from "../src/components/WithAuth";
import moment from "moment";
import { SummaryInterface } from "../src/types/insights";
import { formatPrice } from "../src/utils/misc";

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
    <div>
      <MetricCard title="Total orders" value={summary.totalOrderCount} />
      <MetricCard title="Total Customers" value={summary.totalCustomers} />
      <MetricCard title="Total Quotes" value={summary.totalQuotes} />
      <MetricCard
        title="Total Revenue"
        value={formatPrice(summary.totalRevenue)}
      />
      <MetricCard title="Ecosystems" value={businessData.ecosystems.length} />
    </div>
  );
};

export default WithAuth(Insight);
