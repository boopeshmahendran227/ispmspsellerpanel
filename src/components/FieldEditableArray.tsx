import Button from "./atoms/Button";
import {
  FieldArray,
  ErrorMessage,
  useFormikContext,
  ArrayHelpers,
} from "formik";
import CSSConstants from "../constants/CSSConstants";
import _ from "lodash";
import ValidationErrorMsg from "./atoms/ValidationErrorMsg";

interface FieldEditableArrayProps {
  headers: string[];
  name: string;
  onAdd: (arrayHelpers: ArrayHelpers) => void;
  renderInputRow: (index: number) => React.ReactNode;
  label: string;
}

const FieldEditableArray = (props: FieldEditableArrayProps) => {
  const values: object = useFormikContext<object>().values;

  const dataList: any[] = _.get(values, props.name);

  const handleDelete = (arrayHelpers: ArrayHelpers, index: number) => {
    arrayHelpers.remove(index);
  };

  return (
    <FieldArray
      name={props.name}
      render={(arrayHelpers) => (
        <div className="container">
          <div className="inputContainer">
            <table>
              <thead>
                <tr>
                  {dataList.length > 0 &&
                    props.headers.map((header) => <th>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {dataList.map((item, index) => (
                  <tr>
                    {props.renderInputRow(index)}
                    <td className="deleteContainer">
                      <button
                        type="button"
                        onClick={() => handleDelete(arrayHelpers, index)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="buttonContainer">
              <Button onClick={() => props.onAdd(arrayHelpers)}>
                {dataList.length === 0
                  ? `Add ${props.label}`
                  : `Add one more ${props.label}`}
              </Button>
            </div>
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </div>
          <style jsx>{`
            .container {
              margin: 1em 0;
              font-size: 1.1rem;
            }
            .deleteContainer {
              padding: 1em 0.3em;
              vertical-align: top;
            }
            .fa-trash:hover {
              color: ${CSSConstants.warningColor};
            }
          `}</style>
        </div>
      )}
    />
  );
};

export default FieldEditableArray;
