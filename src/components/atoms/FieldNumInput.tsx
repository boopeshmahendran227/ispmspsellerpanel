import { Field, ErrorMessage, useFormikContext } from "formik";
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
          pb={[1, 2]}
        >
          <Input
            {...field}
            onBlur={(e) => handleBlur(e, field.name)}
            minW="60px"
            px={1}
          />
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldNumInput;
