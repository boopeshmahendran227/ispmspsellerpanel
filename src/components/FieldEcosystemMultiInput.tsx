import EcosystemOption from "./atoms/EcosystemOption";
import { BusinessDataInterface } from "types/business";
import ValidationErrorMsg from "./ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import CSSConstants from "../constants/CSSConstants";
import MultiSelect from "./MultiSelect";
import { SelectOptionInterface } from "types/product";

interface FieldEcosystemMultiInputProps {
  businessData: BusinessDataInterface;
  name: string;
}

const FieldEcosystemMultiInput = (
  props: FieldEcosystemMultiInputProps
): JSX.Element => {
  const { name, businessData } = props;
  const ecosystems = [
    {
      value: "Default",
      label: "Istakapaza Default Marketplace",
    },
    ...businessData.ecosystems.map((ecosystem) => ({
      value: ecosystem.ecosystem_id._id,
      label: <EcosystemOption ecosystem={ecosystem} />,
    })),
  ];

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
