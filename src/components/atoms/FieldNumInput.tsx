import { Field, ErrorMessage, useFormikContext } from "formik";
import classNames from "classnames";
import ValidationErrorMsg from "./ValidationErrorMsg";
import { FormControl, Input } from "@chakra-ui/core";

interface FieldNumInputProps {
  name: string;
}

const FieldNumInput = (props: FieldNumInputProps) => {
  const { setFieldValue } = useFormikContext();

  const handleBlur = (e, fieldName) => {
    // Remove non numeric characters
    const value = e.target.value.replace(/[^\d\.]/gi, "");

    setFieldValue(fieldName, Number(value));
  };

  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
          p="0.3em 0"
        >
          <Input {...field} onBlur={(e) => handleBlur(e, field.name)} />
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldNumInput;
