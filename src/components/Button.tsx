import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";
import Chroma from "chroma-js";

export enum ButtonType {
  default = "default",
  primary = "primary",
  success = "success",
  warning = "warning",
  danger = "danger",
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

const getCurrentColor = (type: ButtonType) => {
  switch (type) {
    case ButtonType.primary:
      return CSSConstants.primaryColor;
    case ButtonType.success:
      return CSSConstants.successColor;
    case ButtonType.warning:
      return CSSConstants.warningColor;
    case ButtonType.danger:
      return CSSConstants.dangerColor;
  }
  return "#eee";
};

const Button = (props: ButtonProps) => {
  const classes = classNames({
    [props.type]: true,
    [props.className]: true,
    outlined: props.outlined,
    fullWidth: props.fullWidth,
    ripple: true,
  });

  const currentColor = getCurrentColor(props.type);

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
          margin: 0.2em;
          font-weight: 500;
          background: ${currentColor};
          transition: all 0.3s;
          font-size: inherit;
          border: none;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-radius: 4px;
        }
        button:not(.outlined):hover {
          background: ${Chroma(currentColor).darken(0.7).css()};
        }
        button.outlined:hover {
          background: #f3f4f6;
        }
        .primary,
        .danger,
        .success,
        .warning {
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
          border-color: #ebebe4;
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
  outlined: false,
};

export default Button;
