import Select from "react-select";
import { SelectOptionInterface } from "../../types/product";
import { Box } from "@chakra-ui/core";

interface MultiSelectProps {
  value: SelectOptionInterface[];
  onChange: (selectedOptions: SelectOptionInterface[]) => void;
  options: SelectOptionInterface[];
}

const MultiSelect = (props: MultiSelectProps) => {
  return (
    <Box my={1}>
      <Select
        value={props.value}
        onChange={(values: SelectOptionInterface[]) =>
          props.onChange(values || [])
        }
        isMulti={true}
        options={props.options}
      />
    </Box>
  );
};

export default MultiSelect;
