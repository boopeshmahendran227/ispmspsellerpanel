/**
 * Styles copied from https://codepen.io/andreasstorm/pen/NwyQEX
 */
import CSSConstants from "../constants/CSSConstants";

interface RadioButtonProps {
  name?: string;
  label: React.ReactNode;
  value: number | string;
  checked: boolean;
  onChange: (value) => void;
}

const RadioButton = (props: RadioButtonProps) => {
  const { value } = props;
  const onChange = (e) => {
    const value = e.target.value;
    props.onChange(value);
  };

  return (
    <label>
      <input
        name={props.name}
        type="radio"
        checked={props.checked}
        value={value}
        onChange={onChange}
      />
      <svg width="20px" height="20px" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8"></circle>
        <path
          d="M10,7 C8.34314575,7 7,8.34314575 7,10 C7,11.6568542 8.34314575,13 10,13 C11.6568542,13 13,11.6568542 13,10 C13,8.34314575 11.6568542,7 10,7 Z"
          className="inner"
        ></path>
        <path
          d="M10,1 L10,1 L10,1 C14.9705627,1 19,5.02943725 19,10 L19,10 L19,10 C19,14.9705627 14.9705627,19 10,19 L10,19 L10,19 C5.02943725,19 1,14.9705627 1,10 L1,10 L1,10 C1,5.02943725 5.02943725,1 10,1 L10,1 Z"
          className="outer"
        ></path>
      </svg>
      {Boolean(props.label) && <span>{props.label}</span>}
      <style jsx>{`
        label {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          padding: 0.3em;
          border-radius: 0.4em;
          user-select: none;
        }
        label:hover {
          background: #eee;
        }
        svg {
          fill: none;
          vertical-align: middle;
        }
        svg circle {
          stroke-width: 2;
          stroke: #c8ccd4;
        }
        svg path {
          stroke: ${CSSConstants.primaryColor};
        }
        svg path.inner {
          stroke-width: 6;
          stroke-dasharray: 19;
          stroke-dashoffset: 19;
        }
        svg path.outer {
          stroke-width: 2;
          stroke-dasharray: 57;
          stroke-dashoffset: 57;
        }
        input {
          display: none;
        }
        input:checked + svg path {
          transition: all 0.4s ease;
        }
        input:checked + svg path.inner {
          stroke-dashoffset: 38;
          transition-delay: 0.3s;
        }
        input:checked + svg path.outer {
          stroke-dashoffset: 0;
        }
        span {
          display: inline-block;
          vertical-align: middle;
          margin: 0 0.6em;
        }
      `}</style>
    </label>
  );
};

export default RadioButton;
