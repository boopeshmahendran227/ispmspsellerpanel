import { Field, ErrorMessage, useFormikContext } from "formik";
import classNames from "classnames";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import CSSConstants from "../../constants/CSSConstants";
import { useState } from "react";

interface FieldPriceInputProps {
  name: string;
  metaInfo?: string;
}

const FieldPriceInput = (props: FieldPriceInputProps) => {
  const { setFieldValue } = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e, fieldName) => {
    // Remove non numeric characters
    const value = e.target.value.replace(/[^\d\.]/gi, "");
    const numValue = Number(value);

    setFieldValue(fieldName, numValue);
    setIsFocused(false);
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
            <span className="prefix">₹ </span>
            <input
              type="text"
              {...field}
              value={isFocused ? field.value : field.value?.toLocaleString()}
              onBlur={(e) => handleBlur(e, field.name)}
              onFocus={handleFocus}
            />
          </div>
          {Boolean(props.metaInfo) && (
            <div className="metaContainer">{props.metaInfo}</div>
          )}
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
            .prefix {
              min-width: 20px;
              text-align: center;
              color: ${CSSConstants.secondaryTextColor};
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
            .metaContainer {
              color: ${CSSConstants.secondaryTextColor};
              font-size: 0.8rem;
              max-width: 200px;
            }
          `}</style>
        </label>
      )}
    </Field>
  );
};

export default FieldPriceInput;
