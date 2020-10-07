import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import ValidationErrorMsg from "./ValidationErrorMsg";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/core";
import { capitalizeFirstLetter } from "utils/misc";

interface FieldInputProps {
  name: string;
}

const FieldInput = (props: FieldInputProps) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
          p="0.3em 0"
        >
          {/* <FormLabel htmlFor={props.name}>{props.name}</FormLabel> */}
          <Input {...field} />
          {form.errors[props.name] && (
            <FormErrorMessage>
              {capitalizeFirstLetter(form.errors[props.name])}
            </FormErrorMessage>
          )}
        </FormControl>
      )}
    </Field>
  );
};

export default FieldInput;
