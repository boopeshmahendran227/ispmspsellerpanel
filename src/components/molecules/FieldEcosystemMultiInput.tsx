import EcosystemOption from "../atoms/EcosystemOption";
import { EcosystemResponseInterface } from "types/business";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import MultiSelect from "../atoms/MultiSelect";
import { SelectOptionInterface } from "types/product";
import { FormControl } from "@chakra-ui/core";

interface FieldEcosystemMultiInputProps {
  ecosystemData: EcosystemResponseInterface;
  name: string;
}

const FieldEcosystemMultiInput = (
  props: FieldEcosystemMultiInputProps
): JSX.Element => {
  const { name, ecosystemData } = props;
  const ecosystems = ecosystemData.map((ecosystem) => ({
    value: ecosystem._id,
    label: <EcosystemOption ecosystem={ecosystem} />,
  }));

  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[props.name] && form.touched[props.name]}
          my={3}
        >
          <MultiSelect
            value={field.value.map((id: string) =>
              ecosystems.find((ecosystem) => ecosystem.value === id)
            )}
            onChange={(value: SelectOptionInterface[]) => {
              field.onChange({
                target: { name, value: value.map((value) => value.value) },
              });
            }}
            options={ecosystems}
          />
          <ErrorMessage component={ValidationErrorMsg} name={props.name} />
        </FormControl>
      )}
    </Field>
  );
};

export default FieldEcosystemMultiInput;
