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
        onChange={props.onChange}
        isMulti={true}
        options={props.options}
      />
      <style jsx>{`
        .container {
          margin: 0.9em 0;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
};

export default MultiSelect;
