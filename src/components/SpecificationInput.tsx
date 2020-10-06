import InputLabel from "./InputLabel";
import CSSConstants from "../constants/CSSConstants";
import FieldInput from "./FieldInput";
import FieldEditableArray from "./FieldEditableArray";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";
import SectionHeader from "./atoms/SectionHeader";

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
      <SectionHeaderContainer>
        <SectionHeader>Specification</SectionHeader>
      </SectionHeaderContainer>
      <FieldEditableArray
        name="specification.itemGroups"
        headers={[]}
        renderInputRow={(groupIndex) => (
          <div className="specGroupContainer">
            <div className="specGroupInput">
              <InputLabel label="Group name" />
              <FieldInput
                name={`specification.itemGroups.${groupIndex}.name`}
              />
            </div>
            <FieldEditableArray
              headers={["S.no", "Key", "Value"]}
              name={`specification.itemGroups.${groupIndex}.items`}
              onAdd={handleAddSpecItem}
              renderInputRow={(index) => (
                <>
                  <td>{index + 1}</td>
                  <td>
                    <FieldInput
                      name={`specification.itemGroups.${groupIndex}.items.${index}.key`}
                    />
                  </td>
                  <td>
                    <FieldInput
                      name={`specification.itemGroups.${groupIndex}.items.${index}.value`}
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
