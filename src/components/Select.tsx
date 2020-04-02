import * as React from "react";
import CSSConstants from "../constants/CSSConstants";
import { returnEmptyStringIfFalse } from "../utils/misc";

interface SelectProps {
  children: React.ReactNode;
  name?: string;
  onChange?: any;
  value?: string;
  disabled?: boolean;
}

const Select = (props: SelectProps) => {
  // Convert null to empty string
  const value = returnEmptyStringIfFalse(props.value);
  const onChange = e => {
    let value = e.target.value;
    if (value === "") {
      value = null;
    }
    // Creating a fake event for setting null value
    props.onChange({ target: { name: e.target.name, value } });
  };

  return (
    <div className="container">
      <img src="/static/icons/dropdownDownArrow.svg" className="icon" alt="" />
      <select
        name={props.name}
        value={value}
        onChange={onChange}
        disabled={props.disabled}
      >
        {props.children}
      </select>
      <style jsx>{`
        .container {
          display: inline-block;
          position: relative;
        }
        select {
          appearance: none;
          border: 1px solid ${CSSConstants.primaryButtonColor};
          border-radius: 0.4em;
          font-size: inherit;
          padding: 0.3em 2em 0.3em 0.6em;
          margin: 0.2em;
          color: inherit;
        }
        .icon {
          position: absolute;
          right: 0.3em;
          top: 50%;
          transform: translateY(-50%);
          height: 0.9rem;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

Select.defaultProps = {
  disabled: false
};

export default Select;
