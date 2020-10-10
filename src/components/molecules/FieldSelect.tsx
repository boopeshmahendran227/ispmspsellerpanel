import Select from "../atoms/Select";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import CSSConstants from "../../constants/CSSConstants";
import { SelectOptionInterface } from "../../types/product";
import { Box, FormControl } from "@chakra-ui/core";

interface FieldSelectProps {
  name: string;
  options: SelectOptionInterface[];
  disabled?: boolean;
}

const FieldSelect = (props: FieldSelectProps) => {
  const { name } = props;

  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
          py={3}
        >
          <Select
            disabled={props.disabled}
            value={field.value}
            onChange={(value) => {
              field.onChange({
                target: { name, value: value },
              });
            }}
            options={props.options}
          />

          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldSelect;
