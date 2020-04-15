import MetricCard from "../src/components/MetricCard";
import CancellationRequestContainer from "../src/components/CancellationRequestContainer";
import TabSection from "../src/components/TabSection";
import ReturnRequestContainer from "../src/components/ReturnRequestContainer";

const Index = () => (
  <div>
    <div>
      <MetricCard title="Orders (today)" value={20} />
      <MetricCard
        title="Payment Volume (today)"
        value={3000}
        beforeContent="₹"
      />
      <MetricCard title="Quotes (today)" value={40} />
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

export default Index;
