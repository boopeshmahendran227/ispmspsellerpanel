import Select from "react-select";
import { SelectOptionInterface } from "../types/product";

interface MultiSelectProps {
  value: SelectOptionInterface[];
  onChange: (selectedOptions: SelectOptionInterface[]) => void;
  options: SelectOptionInterface[];
}

const MultiSelect = (props: MultiSelectProps) => {
  return (
    <div className="container">
      <Select
        value={props.value}
        onChange={(values: SelectOptionInterface[]) =>
          props.onChange(values || [])
        }
        isMulti={true}
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

export default MultiSelect;
