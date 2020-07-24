import ValidationErrorMsg from "./ValidationErrorMsg";
import { Field, ErrorMessage } from "formik";
import CSSConstants from "../constants/CSSConstants";
import classNames from "classnames";

interface FieldTextAreaProps {
  name: string;
}

const FieldTextArea = (props: FieldTextAreaProps) => {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <div
          className={classNames({
            container: true,
            error: Boolean(form.touched[props.name] && form.errors[props.name]),
          })}
        >
          <textarea rows={6} cols={40} {...field} />
          <div className="errorContainer">
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .container {
              margin: 0.3em 0;
              width: 100%;
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
              width: 100%;
              font-family: Lato;
            }
          `}</style>
        </div>
      )}
    </Field>
  );
};

export default FieldTextArea;
