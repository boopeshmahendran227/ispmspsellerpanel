import CSSConstants from "../constants/CSSConstants";

interface RatingProps {
  value: number;
}

const Rating = (props: RatingProps) => {
  // Rating can be null
  if (!props.value) {
    return null;
  }

  let color = CSSConstants.successColor;

  if (props.value >= 2.5 && props.value <= 3.5) {
    color = CSSConstants.warningColor;
  } else if (props.value < 2.5) {
    color = CSSConstants.dangerColor;
  }

  return (
    <div className="rating">
      <span>{props.value} </span>★
      <style jsx>{`
        .rating {
          margin: 0.4em;
          margin-left: 0;
          vertical-align: middle;
          display: inline-block;
          font-size: 0.8rem;
          background: ${color};
          color: white;
          padding: 0.3em;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default Rating;
