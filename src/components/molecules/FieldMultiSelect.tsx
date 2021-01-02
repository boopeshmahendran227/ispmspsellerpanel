import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import MultiSelect from "../atoms/MultiSelect";
import { SelectOptionInterface } from "../../types/product";
import { Box, FormControl } from "@chakra-ui/core";

interface FieldMultiSelectProps {
  name: string;
  options: SelectOptionInterface[];
}

const FieldMultiSelect = (props: FieldMultiSelectProps) => {
  const { name } = props;

  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
          pb={3}
        >
          <Box>
            <MultiSelect
              value={field.value}
              onChange={(value) => {
                field.onChange({
                  target: { name, value: value },
                });
              }}
              options={props.options}
            />
          </Box>
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldMultiSelect;
