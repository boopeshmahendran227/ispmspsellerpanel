import useSWR from "swr";
import { AttributeInterface, SelectedAttribute } from "../types/product";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import MultiSelect from "../../src/components/MultiSelect";
import Button from "../../src/components/Button";

interface SelectAttributesProps {
  selectedAttributes: SelectedAttribute[];
  setSelectedAttributes: (selectedAttributes: SelectedAttribute[]) => void;
  showAttributeModal: () => void;
}

const SelectAttributes = (props: SelectAttributesProps) => {
  const attributeSWR = useSWR("/attribute");
  const attributes: AttributeInterface[] = attributeSWR.data;

  const error = attributeSWR.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!attributes) {
    return <Loader />;
  }

  const attributeOptions = attributes.map((attribute) => ({
    value: attribute.id,
    label: attribute.name,
  }));

  const selectedOption = props.selectedAttributes.map((attribute) => ({
    value: attribute.attributeId,
    label: attribute.attributeName,
  }));

  const handleChange = (selectedOption) => {
    props.setSelectedAttributes(
      selectedOption.map(
        (option): SelectedAttribute => ({
          attributeId: option.value,
          attributeName: option.label,
        })
      )
    );
  };

  return (
    <div className="container">
      <header>
        Step 1: Select Attributes
        <div className="buttonContainer">
          <Button onClick={() => props.showAttributeModal()}>
            Create New Attribute
          </Button>
        </div>
      </header>
      <div className="selectContainer">
        <MultiSelect
          value={selectedOption}
          onChange={handleChange}
          options={attributeOptions}
        />
      </div>
      <style jsx>{`
        header {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1em;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .buttonContainer {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default SelectAttributes;
