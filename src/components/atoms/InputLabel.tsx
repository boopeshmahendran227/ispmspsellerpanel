import CSSConstants from "../../constants/CSSConstants";
import { FormLabel } from "@chakra-ui/core";

interface InputLabelProps {
  label: string;
}

const InputLabel = (props: InputLabelProps) => {
  return (
    <FormLabel
      textAlign="right"
      color={CSSConstants.secondaryTextColor}
      minW="200px"
    >
      {props.label}:
    </FormLabel>
  );
};

export default InputLabel;
