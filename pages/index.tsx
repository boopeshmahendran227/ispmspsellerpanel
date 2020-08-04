import MetricCard from "../src/components/MetricCard";
import CancellationRequestContainer from "../src/components/CancellationRequestContainer";
import TabSection from "../src/components/TabSection";
import ReturnRequestContainer from "../src/components/ReturnRequestContainer";
import { SummaryInterface } from "../src/types/quote";
import useSWR from "swr";
import Loader from "../src/components/Loader";
import PageError from "../src/components/PageError";
import WithAuth from "../src/components/WithAuth";
import moment from "moment";
import { formatPrice } from "../src/utils/misc";

const Home = () => {
  const startDate = moment().subtract(7, "days").startOf("day");
  const endDate = moment().endOf("day");
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
      <div>
        <MetricCard title="Total orders" value={summary.totalOrderCount} />
        <MetricCard title="Total Customers" value={summary.totalCustomers} />
        <MetricCard title="Total Quotes" value={summary.totalQuotes} />
        <MetricCard
          title="Total Revenue"
          value={formatPrice(summary.totalRevenue)}
        />
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

export default WithAuth(Home);
