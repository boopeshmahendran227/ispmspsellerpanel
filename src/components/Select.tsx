import ReactSelect from "react-select";
import { SelectOptionInterface } from "../types/product";

interface SelectProps {
  value: SelectOptionInterface;
  onChange: (selectedOption: SelectOptionInterface) => void;
  options: SelectOptionInterface[];
}

const Select = (props: SelectProps) => {
  return (
    <div className="container">
      <ReactSelect
        value={props.value}
        onChange={(values) => props.onChange(values || [])}
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
