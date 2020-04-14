import CSSConstants from "../constants/CSSConstants";

interface RatingProps {
  value: number;
}

const getColor = (value: number) => {
  if (value >= 2.5 && value <= 3.5) {
    return CSSConstants.warningColor;
  } else if (value < 2.5) {
    return CSSConstants.dangerColor;
  }
  return CSSConstants.successColor;
};

const Rating = (props: RatingProps) => {
  // Rating can be null
  if (!props.value) {
    return null;
  }

  const color = getColor(props.value);

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
