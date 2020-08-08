import MetricCard from "components/MetricCard";
import { SummaryInterface } from "types/insights";
import useSWR from "swr";
import Loader from "components/Loader";
import PageError from "components/PageError";
import WithAuth from "components/WithAuth";
import moment from "moment";
import { formatPrice } from "../src/utils/misc";

const startDate = moment().subtract(7, "days").startOf("day");
const endDate = moment().endOf("day");

const Home = (): JSX.Element => {
  const swr = useSWR(
    `/reports/seller/summary?start=${startDate
      .utc()
      .format()}&end=${endDate.utc().format()}`
  );

  const summary: SummaryInterface = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!summary) {
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
    </div>
  );
};

export default WithAuth(Home);
