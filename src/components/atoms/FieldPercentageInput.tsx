import { Field, ErrorMessage, useFormikContext } from "formik";
import ValidationErrorMsg from "./ValidationErrorMsg";
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";

interface FieldPercentageInputProps {
  name: string;
}

const FieldPercentageInput = (props: FieldPercentageInputProps) => {
  const { setFieldValue } = useFormikContext();

  const handleBlur = (e, fieldName) => {
    // Remove non numeric characters
    const value = e.target.value.replace(/[^\d\.]/gi, "");
    const numValue = Number(value);

    setFieldValue(fieldName, numValue);
  };

  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
          pb={[1, 2]}
        >
          <InputGroup>
            <InputRightElement children="%" />
            <Input
              {...field}
              onBlur={(e) => handleBlur(e, field.name)}
              minW="80px"
              pl={1}
            />
          </InputGroup>
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldPercentageInput;
