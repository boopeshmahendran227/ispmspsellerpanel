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
          pb={[1, 2]}
        >
          <Input {...field} minW="60px" px={1} />
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldInput;
