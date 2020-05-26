import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";
import Chroma from "chroma-js";
import _ from "lodash";

interface PaginationProps {
  value: number;
  onChange: (value: number) => void;
  totalNumberOfPages: number;
}

const Pagination = (props: PaginationProps) => {
  const low = Math.max(props.value - 4, 1);
  const high = Math.min(props.totalNumberOfPages, low + 9);

  const handleClick = (value) => {
    props.onChange(value);
  };

  const goToNext = () => {
    props.onChange(props.value + 1);
  };

  const goToPrev = () => {
    props.onChange(props.value - 1);
  };

  const pages = _.range(low, high + 1).map((i) => {
    const classes = classNames({
      page: true,
      active: props.value === i,
    });
    return (
      <div key={i} className={classes}>
        <button onClick={() => handleClick(i)}>{i}</button>
        <style jsx>{`
          .page {
            display: inline-block;
            margin: 0 0.1em;
          }
          button {
            display: inline-block;
            border: none;
            font-size: 0.9rem;
            border-radius: 0.3em;
            min-width: 2em;
            min-height: 2em;
            outline: none;
            transition: all 0.3s;
          }
          button:hover {
            background: ${Chroma(CSSConstants.primaryColor).brighten(2).css()};
            color: white;
          }
          .page.active button {
            background: ${CSSConstants.primaryColor};
            color: white;
          }
        `}</style>
      </div>
    );
  });

  const prevButtonClasses = classNames({
    prevButton: true,
    hide: props.value <= 1,
  });

  const nextButtonClasses = classNames({
    nextButton: true,
    hide: props.value >= props.totalNumberOfPages,
  });

  return (
    <div className="container">
      <button className={prevButtonClasses} onClick={goToPrev}>
        <i className="fas fa-chevron-left"></i> Previous
      </button>
      <div className="pageContainer">{pages}</div>
      <button className={nextButtonClasses} onClick={goToNext}>
        Next <i className="fas fa-chevron-right"></i>
      </button>
      <style jsx>{`
        .container {
          width: 100%;
          text-align: center;
          margin: 1em 0;
        }
        .prevButton,
        .nextButton {
          transition: all 0.3s;
          opacity: 1;
          pointer-events: auto;
          padding: 9px 15px;
          border-radius: 0.2em;
          border: 1px solid #d4d5d9;
          margin: 0 3em;
          font-weight: 500;
        }
        .prevButton:hover,
        .nextButton:hover {
          border: 1px solid ${CSSConstants.primaryColor};
        }
        .prevButton.hide,
        .nextButton.hide {
          opacity: 0;
          pointer-events: none;
        }
        .pageContainer {
          display: inline-block;
        }
        @media (max-width: 800px) {
          .pageContainer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Pagination;
