import { Field, ErrorMessage, useFormikContext } from "formik";
import classNames from "classnames";
import ValidationErrorMsg from "./ValidationErrorMsg";

interface FieldNumInputProps {
  name: string;
}

const FieldNumInput = (props: FieldNumInputProps) => {
  const { setFieldValue } = useFormikContext();

  const handleBlur = (e, fieldName) => {
    // Remove non numeric characters
    const value = e.target.value.replace(/[^\d\.]/gi, "");

    setFieldValue(fieldName, Number(value));
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
          <input
            type="text"
            {...field}
            onBlur={(e) => handleBlur(e, field.name)}
          />
          <div className="errorContainer">
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .container {
              margin: 0.3em 0;
              width: 100%;
              font-size: 1.1rem;
            }
            input {
              padding: 0.6em;
              width: 100%;
            }
          `}</style>
        </label>
      )}
    </Field>
  );
};

export default FieldNumInput;
