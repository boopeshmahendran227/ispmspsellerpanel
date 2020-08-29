import { ChangeEvent } from "react";

/**
 * Styles copied from https://codepen.io/andreasstorm/pen/yjLGGN
 */
interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const color = "#ff5957";

  return (
    <label>
      <input
        type="checkbox"
        className="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      />
      <span className="svgContainer">
        <svg width="12px" height="10px" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      {Boolean(props.label) && <span className="label">{props.label}</span>}
      <style jsx>{`
        .checkbox {
          display: none;
        }
        label {
          margin: 5px;
          -webkit-user-select: none;
          user-select: none;
          cursor: pointer;
        }
        .label {
          display: inline-block;
          vertical-align: middle;
          margin: 0.2em 0.4em;
          transition: all 0.3s;
        }
        label:hover .label {
          color: ${color};
        }
        .svgContainer {
          display: inline-block;
          vertical-align: middle;
          transform: translate3d(0, 0, 0);
        }
        .svgContainer {
          position: relative;
          width: 1em;
          height: 1em;
          border-radius: 3px;
          transform: scale(1);
          vertical-align: middle;
          border: 1px solid #666;
          transition: all 0.2s ease;
        }
        .svgContainer svg {
          position: absolute;
          top: 50%;
          left: 50%;
          fill: none;
          stroke: #ffffff;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 16px;
          stroke-dashoffset: 16px;
          transition: all 0.3s ease;
          transition-delay: 0.1s;
          transform: translate3d(0, 0, 0) translate(-50%, -50%);
        }
        .svgContainer:before {
          content: "";
          width: 100%;
          height: 100%;
          background: ${color};
          display: block;
          transform: scale(0);
          opacity: 1;
          border-radius: 100%;
        }
        label:hover .svgContainer {
          border-color: ${color};
        }
        .checkbox:checked + .svgContainer {
          background: ${color};
          border-color: ${color};
          animation: wave 0.4s ease;
        }
        .checkbox:checked + .svgContainer svg {
          stroke-dashoffset: 0;
        }
        .checkbox:checked + .svgContainer:before {
          transform: scale(3.5);
          opacity: 0;
          transition: all 0.6s ease;
        }
        @keyframes wave {
          50% {
            transform: scale(0.9);
          }
        }
      `}</style>
    </label>
  );
};

export default Checkbox;
