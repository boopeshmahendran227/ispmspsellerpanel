import InputLabel from "./InputLabel";
import CSSConstants from "../constants/CSSConstants";
import FieldInput from "./FieldInput";
import FieldEditableArray from "./FieldEditableArray";

const SpecificationInput = () => {
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

  return (
    <div className="container">
      <header>Specification</header>
      <FieldEditableArray
        name="specification.itemGroups"
        headers={[]}
        renderInputRow={(index) => (
          <div className="specGroupContainer">
            <div className="specGroupInput">
              <InputLabel label="Group name" />
              <FieldInput name={`specification.itemGroups.${index}.name`} />
            </div>
            <FieldEditableArray
              headers={["S.no", "Key", "Value"]}
              name={`specification.itemGroups.${index}.items`}
              onAdd={handleAddSpecItem}
              renderInputRow={(index) => (
                <>
                  <td>{index + 1}</td>
                  <td>
                    <FieldInput
                      name={`specification.itemGroups.${index}.items.${index}.key`}
                    />
                  </td>
                  <td>
                    <FieldInput
                      name={`specification.itemGroups.${index}.items.${index}.value`}
                    />
                  </td>
                </>
              )}
              label="Specification Item"
            />
          </div>
        )}
        onAdd={handleAddSpecGroup}
        label="Specification Group"
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
          margin-left: 3em;
        }
        .specGroupInput {
          display: grid;
          grid-template-columns: 200px 200px;
          align-items: center;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
};

export default SpecificationInput;
