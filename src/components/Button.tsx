import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";

export enum ButtonType {
  default = "default",
  primary = "primary",
  success = "success",
  danger = "danger"
}

interface ButtonProps {
  className?: string;
  type: ButtonType;
  onClick?: (e) => void;
  fullWidth?: boolean;
  children: React.ReactNode;
  isSubmitButton: boolean;
  outlined: boolean;
  disabled: boolean;
}

const Button = (props: ButtonProps) => {
  const classes = classNames({
    [props.type]: true,
    [props.className]: true,
    outlined: props.outlined,
    fullWidth: props.fullWidth,
    ripple: true
  });

  let currentColor = "#eee";
  switch (props.type) {
    case ButtonType.primary:
      currentColor = CSSConstants.primaryColor;
      break;
  }

  return (
    <button
      type={props.isSubmitButton ? "submit" : "button"}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
      <style jsx>{`
        button {
          padding: 0.5em 0.8em;
          margin: 0.3em;
          font-weight: 500;
          background: ${currentColor};
          transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
          font-size: inherit;
          border: none;
          letter-spacing: 1px;
        }
        button:hover {
          box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14),
            0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }
        .primary,
        .danger,
        .success {
          color: white;
        }
        .fullWidth {
          width: 100%;
        }
        .outlined {
          background: transparent;
          color: ${currentColor};
          border: 1px solid ${currentColor};
        }
        button:disabled,
        button[disabled] {
          background: #ebebe4;
          color: rgba(119, 119, 119, 0.54);
          box-shadow: none;
        }
        .ripple {
          position: relative;
          overflow: hidden;
          transform: translate3d(0, 0, 0);
        }
        .ripple:after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          background-image: radial-gradient(
            circle,
            #fff 10%,
            transparent 10.01%
          );
          background-repeat: no-repeat;
          background-position: 50%;
          transform: scale(10, 10);
          opacity: 0;
          transition: transform 0.5s, opacity 1s;
        }
        .ripple:active:after {
          transform: scale(0, 0);
          opacity: 0.3;
          transition: 0s;
        }
      `}</style>
    </button>
  );
};

Button.defaultProps = {
  type: ButtonType.primary,
  className: "",
  isSubmitButton: false,
  disabled: false,
  outlined: false
};

export default Button;
