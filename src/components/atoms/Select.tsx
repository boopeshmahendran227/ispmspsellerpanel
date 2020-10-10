import ReactSelect from "react-select";
import { SelectOptionInterface } from "types/product";
import { Box } from "@chakra-ui/core";
interface SelectProps {
  value: SelectOptionInterface;
  onChange: (selectedOption: SelectOptionInterface) => void;
  options: SelectOptionInterface[];
  disabled?: boolean;
}

const Select = (props: SelectProps) => {
  return (
    <Box w="100%">
      <ReactSelect
        isDisabled={props.disabled}
        value={props.value}
        onChange={(value: SelectOptionInterface) => props.onChange(value)}
        options={props.options}
      />
    </Box>
  );
};

export default Select;
