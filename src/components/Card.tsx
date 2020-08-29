import CSSConstants from "../constants/CSSConstants";

interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <div className="card">
      {props.children}
      <style jsx>{`
        .card {
          background: ${CSSConstants.foregroundColor};
          border: ${CSSConstants.borderStyle};
          padding: 1em;
        }
      `}</style>
    </div>
  );
};

export default Card;
