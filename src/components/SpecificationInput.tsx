import Button from "./Button";
import { FieldArray, useFormikContext, Field } from "formik";
import { SpecificationInterface } from "../types/product";
import InputLabel from "./InputLabel";

const SpecificationInput = () => {
  const { values } = useFormikContext();

  const specification: SpecificationInterface = values.specification;

  const handleAddSpecGroup = (arrayHelpers) => {
    arrayHelpers.push({
      name: "abcd",
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

  return (
    <FieldArray
      name="specification.itemGroups"
      render={(arrayHelpers) => (
        <div className="container">
          <div className="label">Specification: </div>
          <div className="inputContainer">
            {specification.itemGroups.length > 0 &&
              specification.itemGroups.map((group, groupIndex) => (
                <div className="specGroupContainer">
                  <InputLabel label="Group name" />
                  <Field name={`specification.itemGroups.${groupIndex}.name`} />
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
                                    <Field
                                      name={`specification.itemGroups.${groupIndex}.items.${itemIndex}.key`}
                                    />
                                  </td>
                                  <td>
                                    <Field
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
          <style jsx>{`
            .container {
              margin: 1em 0;
              width: 100%;
              font-size: 1.1rem;
              display: flex;
              align-items: center;
            }
            .label {
              display: inline-block;
              font-weight: 500;
              min-width: 200px;
              text-align: right;
            }
            .inputContainer {
              margin: 0 1em;
            }
          `}</style>
        </div>
      )}
    />
  );
};

export default SpecificationInput;
