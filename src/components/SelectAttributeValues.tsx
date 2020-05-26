import {
  AttributeInterface,
  SelectedAttribute,
  AttributeValueInterface,
  SelectedAttributeValuesMap,
} from "../types/product";
import useSWR from "swr";
import Error from "next/error";
import Loader from "../../src/components/Loader";
import CSSConstants from "../../src/constants/CSSConstants";
import MultiSelect from "./MultiSelect";
import CreateAttributeValue from "./CreateAttributeValue";

interface SelectAttributeValuesProps {
  selectedAttributes: SelectedAttribute[];
  selectedAttributeValues: SelectedAttributeValuesMap;
  setSelectedAttributeValues: (
    attributeId: number,
    values: AttributeValueInterface[]
  ) => void;
}

const SelectAttributeValues = (props: SelectAttributeValuesProps) => {
  const attributeSWR = useSWR("/attribute");
  const attributes: AttributeInterface[] = attributeSWR.data;

  const error = attributeSWR.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }

  if (!attributes) {
    return <Loader />;
  }

  const handleChange = (attributeId: number, values) => {
    if (attributeId === undefined) {
      return;
    }

    props.setSelectedAttributeValues(
      attributeId,
      values.map((value) => ({ id: value.value, value: value.label }))
    );
  };

  return (
    <div className="container">
      <header>Step 2: Select Attribute Values </header>
      <div className="subHeader">
        Select values from each attribute to include in the product. Each unique
        combination of values creates a unique Product SKUs
      </div>
      {props.selectedAttributes.map((selectedAttribute) => {
        const attribute = attributes.find(
          (attribute) => attribute.id === selectedAttribute.attributeId
        );

        const attributeValues = attribute.values || [];

        return (
          <div className="attributeContainer">
            <div className="name">{attribute.name}</div>
            <MultiSelect
              value={props.selectedAttributeValues[
                attribute.id
              ].map((value) => ({ value: value.id, label: value.value }))}
              onChange={(values) => handleChange(attribute.id, values)}
              options={attributeValues.map((value) => ({
                label: value.value,
                value: value.id,
              }))}
            />
            <CreateAttributeValue attributeId={attribute.id} />
          </div>
        );
      })}
      <style jsx>{`
        header {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 1em;
        }
        .attributeContainer {
          border: 1px solid ${CSSConstants.borderColor};
          padding: 0.7em;
          margin: 1em 0;
        }
        .attributeContainer .name {
          font-size: 1.1rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default SelectAttributeValues;
