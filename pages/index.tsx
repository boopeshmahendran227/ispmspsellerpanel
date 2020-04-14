import MetricCard from "../src/components/MetricCard";

const Index = () => (
  <div>
    <MetricCard title="Orders (today)" value={20} />
    <MetricCard title="Payment Volume (today)" value={3000} beforeContent="₹" />
    <MetricCard title="Quotes (today)" value={40} />
  </div>
);

export default Index;
