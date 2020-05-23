import Select from "react-select";

interface MultiSelectProps {
  value: OptionInterface[];
  onChange: (selectedOptions: OptionInterface[]) => void;
  options: OptionInterface[];
}

interface OptionInterface {
  value: number;
  label: string;
}

const MultiSelect = (props: MultiSelectProps) => {
  return (
    <div className="container">
      <Select
        value={props.value}
        onChange={(values) => props.onChange(values || [])}
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
