import ReactSelect from "react-select";

interface SelectProps {
  value: OptionInterface;
  onChange: (selectedOption: OptionInterface) => void;
  options: OptionInterface[];
}

interface OptionInterface {
  value: number;
  label: string;
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
