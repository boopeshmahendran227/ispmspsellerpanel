import CSSConstants from "../constants/CSSConstants";

interface MetricCardProps {
  title: string;
  value: number;
  beforeContent?: string;
}

const MetricCard = (props: MetricCardProps) => {
  return (
    <div className="card">
      <div className="title">{props.title}</div>
      <div className="content">
        {props.beforeContent}
        {props.value}
      </div>
      <style jsx>{`
        .card {
          display: inline-block;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          width: 250px;
          height: 150px;
          margin: 1em;
        }
        .title {
          text-transform: capitalize;
          padding: 0.7em;
          font-weight: bold;
        }
        .content {
          padding: 0.5em;
          font-size: 3rem;
        }
      `}</style>
    </div>
  );
};

MetricCard.defaultProps = {
  beforeContent: "",
};

export default MetricCard;
