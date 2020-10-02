import EcosystemOption from "../atoms/EcosystemOption";
import { EcosystemResponseInterface } from "types/business";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import CSSConstants from "../../constants/CSSConstants";
import MultiSelect from "../atoms/MultiSelect";
import { SelectOptionInterface } from "types/product";

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
        <label
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name]),
          })}
        >
          <div>
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
          </div>
          <div className="errorContainer">
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .container {
              margin: 0.3em 0;
            }
            .container.error {
              color: ${CSSConstants.dangerColor};
            }
          `}</style>
        </label>
      )}
    </Field>
  );
};

export default FieldEcosystemMultiInput;
