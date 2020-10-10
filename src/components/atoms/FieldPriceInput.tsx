import { Field, ErrorMessage, useFormikContext } from "formik";
import ValidationErrorMsg from "./ValidationErrorMsg";
import { useState } from "react";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core";

interface FieldPriceInputProps {
  name: string;
  metaInfo?: string;
}

const FieldPriceInput = (props: FieldPriceInputProps) => {
  const { setFieldValue } = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e, fieldName) => {
    // Remove non numeric characters
    const value = e.target.value.replace(/[^\d\.]/gi, "");
    const numValue = Number(value);

    setFieldValue(fieldName, numValue);
    setIsFocused(false);
  };

  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
          py={3}
        >
          <InputGroup>
            <InputLeftElement children="₹" />
            <Input
              {...field}
              value={isFocused ? field.value : field.value?.toLocaleString()}
              onBlur={(e) => handleBlur(e, field.name)}
              onFocus={handleFocus}
            />
          </InputGroup>
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldPriceInput;
