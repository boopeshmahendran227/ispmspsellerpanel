import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";

interface BorderButtonProps {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const BorderButton = (props: BorderButtonProps) => {
  const classes = classNames({
    isActive: props.isActive,
  });

  return (
    <button type="button" onClick={props.onClick} className={classes}>
      {props.children}
      <style jsx>{`
        button {
          border-radius: 0.4em;
          font-size: 0.8rem;
          padding: 0.7em 0.9em;
          margin: 0.3em;
          color: ${CSSConstants.primaryColor};
          border: 1px solid ${CSSConstants.primaryColor};
          background: inherit;
          transition: all 0.3s;
        }
        .isActive,
        button:hover {
          background: ${CSSConstants.primaryColor};
          color: white;
        }
      `}</style>
    </button>
  );
};

BorderButton.defaultProps = {
  isActive: false,
};

export default BorderButton;
