import ValidationErrorMsg from "./ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import CSSConstants from "../constants/CSSConstants";
import { returnEmptyStringIfFalse } from "../utils/misc";

interface FieldInputProps {
  id: string;
  name: string;
  placeholder?: string;
  inputPlaceholder: string;
}

const FieldInput = (props: FieldInputProps) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <div
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name])
          })}
        >
          {Boolean(props.placeholder) && (
            <label htmlFor={props.id}>{props.placeholder}:</label>
          )}
          <input
            type="text"
            {...field}
            value={returnEmptyStringIfFalse(field.value)}
            onChange={e => {
              let value = e.target.value;
              if (value === "") {
                value = null;
              }
              // Creating a fake event for setting null value
              field.onChange({ target: { name: e.target.name, value } });
            }}
            placeholder={props.inputPlaceholder}
          />
          <div className="errorContainer">
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .container {
              display: grid;
              grid-template-columns: ${Boolean(props.placeholder)
                ? "1fr 2fr"
                : "none"};
              grid-column-gap: 0.5em;
              align-items: center;
              margin: 0.3em 0;
            }
            .container.error {
              color: ${CSSConstants.dangerColor};
            }
            .error input {
              border: 1px solid ${CSSConstants.dangerColor};
            }
            label {
              font-weight: bold;
              text-align: right;
            }
            .errorContainer {
              grid-column-start: ${Boolean(props.placeholder) ? 2 : 1};
              text-align: left;
            }
          `}</style>
        </div>
      )}
    </Field>
  );
};

FieldInput.defaultProps = {
  inputPlaceholder: ""
};

export default FieldInput;
