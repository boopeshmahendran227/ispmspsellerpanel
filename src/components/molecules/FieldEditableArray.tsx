import {
  FieldArray,
  ErrorMessage,
  useFormikContext,
  ArrayHelpers,
} from "formik";
import _ from "lodash";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import { Box, IconButton } from "@chakra-ui/core";
import Button from "components/atoms/Button";

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
                    <td>
                      <IconButton
                        p={0}
                        _hover={{ bg: "none", color: "dangerColorVariant.500" }}
                        _active={{ bg: "none" }}
                        _focus={{ boxShadow: "none" }}
                        aria-label="Delete"
                        icon="delete"
                        type="button"
                        bg="none"
                        onClick={() => handleDelete(arrayHelpers, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Box>
              <Button onClick={() => props.onAdd(arrayHelpers)}>
                {dataList.length === 0
                  ? `Add ${props.label}`
                  : `Add one more ${props.label}`}
              </Button>
            </Box>
            <ErrorMessage component={ValidationErrorMsg} name={props.name} />
          </Box>
        </Box>
      )}
    />
  );
};

export default FieldEditableArray;
