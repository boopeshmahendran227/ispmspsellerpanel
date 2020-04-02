import ValidationErrorMsg from "./ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";

interface FieldTextAreaProps {
  id: string;
  name: string;
  placeholder: string;
}

const FieldTextArea = (props: FieldTextAreaProps) => {
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
          <textarea rows={6} cols={40} {...field} />
          <div className="errorContainer">
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .container {
              display: grid;
              grid-template-columns: 1fr 2fr;
              grid-column-gap: 0.5em;
              margin: 0.3em 0;
            }
            .container.error {
              color: ${CSSConstants.dangerColor};
            }
            .error textarea {
              border: 1px solid ${CSSConstants.dangerColor};
            }
            textarea {
              padding: 0.3em;
              resize: none;
            }
            label {
              font-weight: bold;
              text-align: right;
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

export default FieldTextArea;
