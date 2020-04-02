import Select from "./Select";
import ValidationErrorMsg from "./ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import CSSConstants from "../constants/CSSConstants";

interface FieldSelectProps {
  id: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
}

const FieldSelect = (props: FieldSelectProps) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <div
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name])
          })}
        >
          <label htmlFor={props.id}>{props.placeholder}:</label>
          <div className="selectContainer">
            <Select {...field}>{props.children}</Select>
          </div>
          <div className="errorContainer">
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .container {
              display: grid;
              grid-template-columns: 1fr 2fr;
              grid-column-gap: 0.5em;
              align-items: center;
              margin: 0.3em 0;
            }
            .container.error {
              color: ${CSSConstants.dangerButtonColor};
            }
            label {
              font-weight: bold;
              text-align: right;
            }
            .selectContainer {
              text-align: left;
            }
            .errorContainer {
              grid-column-start: 2;
              text-align: left;
            }
          `}</style>
        </div>
      )}
    </Field>
  );
};

export default FieldSelect;
