import ValidationErrorMsg from "./ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import CSSConstants from "../constants/CSSConstants";
import Select from "react-select";

interface FieldMultiSelectProps {
  name: string;
  label: string;
}

const FieldMultiSelect = (props: FieldMultiSelectProps) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name]),
          })}
        >
          <span className="label">{props.label}: </span>
          <div className="selectContainer">
            <Select {...field} />
          </div>
          <div className="errorContainer">
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .container {
              width: 100%;
              margin-bottom: 0.7em;
              font-size: 1.1rem;
              display: flex;
            }
            .container.error {
              color: ${CSSConstants.dangerColor};
            }
            .label {
              display: inline-block;
              margin: 0.6em 0;
              font-weight: 500;
              min-width: 200px;
              text-align: right;
            }
          `}</style>
        </label>
      )}
    </Field>
  );
};

export default FieldMultiSelect;
