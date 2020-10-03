import { Field, ErrorMessage, useFormikContext } from "formik";
import classNames from "classnames";
import ValidationErrorMsg from "./ValidationErrorMsg";
import CSSConstants from "../../constants/CSSConstants";

interface FieldPercentageInputProps {
  name: string;
}

const FieldPercentageInput = (props: FieldPercentageInputProps) => {
  const { setFieldValue } = useFormikContext();

  const handleBlur = (e, fieldName) => {
    // Remove non numeric characters
    const value = e.target.value.replace(/[^\d\.]/gi, "");
    const numValue = Number(value);

    setFieldValue(fieldName, numValue);
  };

  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name]),
          })}
        >
          <div className="inputContainer">
            <input
              type="text"
              {...field}
              onBlur={(e) => handleBlur(e, field.name)}
            />
            <span className="suffix"> %</span>
          </div>
          <div className="errorContainer">
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .inputContainer {
              margin: 0.3em 0;
              width: 100%;
              font-size: 1.1rem;
              border: 1px solid ${CSSConstants.borderColor};
              display: inline-flex;
              align-items: center;
            }
            .inputContainer:focus-within {
              border: 1px solid ${CSSConstants.primaryColor};
            }
            input {
              padding: 0.6em;
              width: 100%;
              border: none;
              margin: 0;
            }
            input:focus {
              border: none;
            }
            .suffix {
              min-width: 20px;
              text-align: center;
              color: ${CSSConstants.secondaryTextColor};
            }
          `}</style>
        </label>
      )}
    </Field>
  );
};

export default FieldPercentageInput;
