import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import CSSConstants from "../../constants/CSSConstants";
import MultiSelect from "../MultiSelect";
import { SelectOptionInterface } from "../../types/product";

interface FieldMultiSelectProps {
  name: string;
  options: SelectOptionInterface[];
}

const FieldMultiSelect = (props: FieldMultiSelectProps) => {
  const { name } = props;

  return (
    <Field name={name}>
      {({ field, form }) => (
        <label
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name]),
          })}
        >
          <div className="selectContainer">
            <MultiSelect
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
        </label>
      )}
    </Field>
  );
};

export default FieldMultiSelect;
