import Button from "./Button";
import { FieldArray, useFormikContext, ErrorMessage } from "formik";
import {
  SpecificationInterface,
  ProductInputInterface,
} from "../types/product";
import InputLabel from "./InputLabel";
import CSSConstants from "../constants/CSSConstants";
import FieldInput from "./FieldInput";
import ValidationErrorMsg from "./ValidationErrorMsg";

const SpecificationInput = () => {
  const values: ProductInputInterface = useFormikContext<
    ProductInputInterface
  >().values;

  const specification: SpecificationInterface = values.specification;

  const handleAddSpecGroup = (arrayHelpers) => {
    arrayHelpers.push({
      name: "",
      items: [],
    });
  };

  const handleAddSpecItem = (arrayHelpers) => {
    arrayHelpers.push({
      key: "",
      value: "",
    });
  };

  const handleDeleteSpecItem = (arrayHelpers, index: number) => {
    arrayHelpers.remove(index);
  };

  const handleDeleteSpecItemGroup = (arrayHelpers, index: number) => {
    arrayHelpers.remove(index);
  };

  return (
    <div className="container">
      <header>Specification</header>
      <FieldArray
        name="specification.itemGroups"
        render={(arrayHelpers) => (
          <div className="inputContainer">
            {specification.itemGroups.length > 0 &&
              specification.itemGroups.map((group, groupIndex) => (
                <div className="specGroupContainer">
                  <div className="specGroupInput">
                    <InputLabel label="Group name" />
                    <FieldInput
                      name={`specification.itemGroups.${groupIndex}.name`}
                    />
                    <button
                      onClick={() =>
                        handleDeleteSpecItemGroup(arrayHelpers, groupIndex)
                      }
                    >
                      <i className="fa fa-trash" aria-hidden="true" />
                    </button>
                  </div>
                  <FieldArray
                    name={`specification.itemGroups.${groupIndex}.items`}
                    render={(arrayHelpers) => (
                      <>
                        {group.items.length > 0 && (
                          <table>
                            <thead>
                              <tr>
                                <th>S.no</th>
                                <th>Key</th>
                                <th>Value</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.items.map((item, itemIndex) => (
                                <tr>
                                  <td>{itemIndex + 1}</td>
                                  <td>
                                    <FieldInput
                                      name={`specification.itemGroups.${groupIndex}.items.${itemIndex}.key`}
                                    />
                                  </td>
                                  <td>
                                    <FieldInput
                                      name={`specification.itemGroups.${groupIndex}.items.${itemIndex}.value`}
                                    />
                                  </td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        handleDeleteSpecItem(
                                          arrayHelpers,
                                          itemIndex
                                        )
                                      }
                                    >
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        <div className="buttonContainer">
                          <Button
                            onClick={() => handleAddSpecItem(arrayHelpers)}
                          >
                            {group.items.length === 0
                              ? "Add Specification Item"
                              : "Add one more Specification Item"}
                          </Button>
                        </div>
                      </>
                    )}
                  />
                  <ErrorMessage
                    component={ValidationErrorMsg}
                    name={`specification.itemGroups.${groupIndex}.items`}
                  />
                </div>
              ))}
            <div className="buttonContainer">
              <Button onClick={() => handleAddSpecGroup(arrayHelpers)}>
                {specification.itemGroups.length === 0
                  ? "Add Specification"
                  : "Add one more Specification Group"}
              </Button>
            </div>
          </div>
        )}
      />
      <ErrorMessage
        component={ValidationErrorMsg}
        name={`specification.itemGroups`}
      />
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
        .specGroupContainer {
          margin: 1em 5em;
        }
        .specGroupInput {
          display: grid;
          grid-template-columns: 200px 200px 100px;
          align-items: center;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default SpecificationInput;
