import MetricCard from "../src/components/MetricCard";
import CancellationRequestContainer from "../src/components/CancellationRequestContainer";

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
      <CancellationRequestContainer />
    </div>
  </div>
);

export default Index;
