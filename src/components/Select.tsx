import ReactSelect from "react-select";
import { SelectOptionInterface } from "types/product";

interface SelectProps {
  value: SelectOptionInterface;
  onChange: (selectedOption: SelectOptionInterface) => void;
  options: SelectOptionInterface[];
  disabled?: boolean;
}

const Select = (props: SelectProps) => {
  return (
    <div className="container">
      <ReactSelect
        isDisabled={props.disabled}
        value={props.value}
        onChange={(value: SelectOptionInterface) => props.onChange(value)}
        options={props.options}
      />
      <style jsx>{`
        .container {
          margin: 0.9em 0;
        }
      `}</style>
    </div>
  );
};

export default Select;
