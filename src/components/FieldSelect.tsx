import Select from "./Select";
import ValidationErrorMsg from "./ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import CSSConstants from "../constants/CSSConstants";

interface OptionInterface {
  value: number;
  label: string;
}

interface FieldSelectProps {
  name: string;
  options: OptionInterface[];
}

const FieldSelect = (props: FieldSelectProps) => {
  const { name } = props;

  return (
    <Field name={name}>
      {({ field, form }) => (
        <div
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name]),
          })}
        >
          <div className="selectContainer">
            <Select
              value={field.value}
              onChange={(value) => {
                field.onChange({
                  target: { name, value: value },
                });
              }}
              options={props.options}
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
        </div>
      )}
    </Field>
  );
};

export default FieldSelect;
