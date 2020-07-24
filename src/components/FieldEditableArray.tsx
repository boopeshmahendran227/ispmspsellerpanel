import Button from "./Button";
import { FieldArray, useFormikContext, ArrayHelpers } from "formik";
import CSSConstants from "../constants/CSSConstants";

interface FieldEditableArrayProps {
  title: string;
  headers: string[];
  name: string;
  handleAdd: (arrayHelpers: ArrayHelpers) => void;
  renderInputRow: (index: number) => React.ReactNode;
}

const FieldEditableArray = (props: FieldEditableArrayProps) => {
  const values: object = useFormikContext<object>().values;

  const dataList: any[] = values[props.name];

  const handleDelete = (arrayHelpers: ArrayHelpers, index: number) => {
    arrayHelpers.remove(index);
  };
  return (
    <FieldArray
      name={props.name}
      render={(arrayHelpers) => (
        <div className="container">
          <header>{props.title}</header>
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
                    <td>
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
              <Button onClick={() => props.handleAdd(arrayHelpers)}>
                {dataList.length === 0
                  ? `Add ${props.title}`
                  : `Add one more ${props.title}`}
              </Button>
            </div>
          </div>
          <style jsx>{`
            .container {
              margin: 3em 0;
              font-size: 1.1rem;
            }
            header {
              font-weight: bold;
              font-size: 1.3rem;
              border-bottom: 1px solid ${CSSConstants.borderColor};
              padding: 0.3em;
              margin-bottom: 1em;
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
