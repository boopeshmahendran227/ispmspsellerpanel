import React from "react";
import CSSConstants from "../constants/CSSConstants";

interface PercentageArrowProps {
  value: number;
}
const PercentageArrow = (props: PercentageArrowProps) => {
  return (
    <div>
      {props.value > 0 ? (
        <span className="green">
          <i className="fas fa-arrow-up"></i>
          {props.value}%
        </span>
      ) : (
        <span className="red">
          <i className="fas fa-arrow-down"></i>
          {props.value}%
        </span>
      )}

      <style jsx>{`
        .red {
          color: ${CSSConstants.dangerColor};
          background: rgba(255, 0, 0, 0.1);
        }
        .green {
          color: ${CSSConstants.successColor};
          background: rgba(0, 255, 0, 0.1);
        }
        span {
          font-weight: bolder;
          margin-left: 1em;
          border-radius: 0.5em;
        }
      `}</style>
    </div>
  );
};
export default PercentageArrow;
