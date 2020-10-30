import ValidationErrorMsg from "./ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import { FormControl, Textarea } from "@chakra-ui/core";

interface FieldTextAreaProps {
  name: string;
}

const FieldTextArea = (props: FieldTextAreaProps) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
        >
          <Textarea rows={6} cols={40} {...field} resize="vertical" p={1} />
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldTextArea;
