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
          <div className="inputContainer">
            <input type="text" placeholder={props.placeholder} {...field} />
            {Boolean(props.metaInfo) && (
              <div className="metaContainer">{props.metaInfo}</div>
            )}
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
            .inputContainer {
              display: inline-flex;
              flex-direction: column;
              align-items: flex-start;
              flex: 1;
            }
            input {
              padding: 0.6em;
              margin: 0.5em;
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
