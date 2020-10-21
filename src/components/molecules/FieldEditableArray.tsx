import {
  FieldArray,
  ErrorMessage,
  useFormikContext,
  ArrayHelpers,
} from "formik";
import CSSConstants from "../../constants/CSSConstants";
import _ from "lodash";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import { Button, Box } from "@chakra-ui/core";

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
        <Box my={3}>
          <Box>
            <table>
              <thead>
                <tr>
                  {dataList.length > 0 &&
                    props.headers.map((header) => <th>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {dataList.map((item, index) => (
                  <tr key={index}>
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
            <Box>
              <Button
                variantColor="primaryColorVariant"
                onClick={() => props.onAdd(arrayHelpers)}
              >
                {dataList.length === 0
                  ? `Add ${props.label}`
                  : `Add one more ${props.label}`}
              </Button>
            </Box>
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </Box>
          <style jsx>{`
            .fa-trash:hover {
              color: ${CSSConstants.warningColor};
            }
          `}</style>
        </Box>
      )}
    />
  );
};

export default FieldEditableArray;
