import { Field, ErrorMessage } from "formik";
import { FormControl, Input } from "@chakra-ui/core";
import ValidationErrorMsg from "./ValidationErrorMsg";

interface FieldInputProps {
  name: string;
}

const FieldInput = (props: FieldInputProps) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
          py={[1, 3]}
        >
          <Input {...field} minW="60px" px={[0, 1]} />
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldInput;
