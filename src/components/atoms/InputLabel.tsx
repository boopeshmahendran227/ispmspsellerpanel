import { FormLabel } from "@chakra-ui/core";

interface InputLabelProps {
  label: string;
}

const InputLabel = (props: InputLabelProps) => {
  return (
    <FormLabel
      textAlign={["left", "right"]}
      color="secondaryTextColor.500"
      minW="200px"
    >
      {props.label}:
    </FormLabel>
  );
};

export default InputLabel;
