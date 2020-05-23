import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import ValidationErrorMsg from "../components/ValidationErrorMsg";
import CSSConstants from "../constants/CSSConstants";

interface FieldInputProps {
  name: string;
  placeholder?: string;
  metaInfo?: string;
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
          <input type="text" placeholder={props.placeholder} {...field} />
          {Boolean(props.metaInfo) && (
            <div className="metaContainer">{props.metaInfo}</div>
          )}
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
              padding: 0.8em;
              width: 100%;
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

export default FieldInput;
