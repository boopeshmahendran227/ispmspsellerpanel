import { Field, ErrorMessage } from "formik";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import DatePicker from "../atoms/DatePicker";
import { Box } from "@chakra-ui/core";

interface FieldDatePickerProps {
  name: string;
}

const FieldDatePicker = (props: FieldDatePickerProps) => {
  return (
    <Field name={props.name}>
      {({ field }) => (
        <Box as="span" my={2} className="container">
          <DatePicker
            value={field.value}
            onChange={(value) => {
              field.onChange({
                target: { name: field.name, value },
              });
            }}
          />
          <ErrorMessage component={ValidationErrorMsg} name={field.name} />
        </Box>
      )}
    </Field>
  );
};

export default FieldDatePicker;
