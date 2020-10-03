import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import ValidationErrorMsg from "./ValidationErrorMsg";

interface FieldInputProps {
  name: string;
}

const FieldInput = (props: FieldInputProps) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name]),
          })}
        >
          <input type="text" {...field} />
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

export default FieldInput;
