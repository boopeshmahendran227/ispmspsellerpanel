import CSSConstants from "../../constants/CSSConstants";
import styled from "styled-components";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1.2em;
`;

const MetricCard = (props: MetricCardProps) => {
  const { icon } = props;

  return (
    <div className="card">
      <FlexContainer>
        <div className="iconContainer">{icon}</div>
        <div className="contentContainer">
          <div className="value">{props.value}</div>
          <div className="title">{props.title}</div>
        </div>
      </FlexContainer>
      <style jsx>{`
        .card {
          display: inline-block;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 0 20px #00000014;
          width: 100%;
          border-radius: 5%;
        }
        .iconContainer {
          margin-right: 1.1em;
        }
        .title {
          text-transform: capitalize;
          font-size: 1.1rem;
          margin-top: 0.2em;
          color: ${CSSConstants.secondaryTextColor};
        }
        .value {
          font-size: 1.7rem;
        }
      `}</style>
    </div>
  );
};

export default MetricCard;
