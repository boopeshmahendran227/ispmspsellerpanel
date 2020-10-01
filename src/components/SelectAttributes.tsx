import useSWR from "swr";
import {
  AttributeInterface,
  SelectedAttribute,
  ProductInputInterface,
  SelectOptionInterface,
} from "../types/product";
import Loader from "components/atoms/Loader";
import MultiSelect from "components/MultiSelect";
import Button from "./atoms/Button";
import PageError from "./atoms/PageError";
import { useFormikContext } from "formik";
import _ from "lodash";

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
    return <PageError statusCode={error.response?.status} />;
  }

  if (!attributes) {
    return <Loader />;
  }

  // Filter Attributes by category
  const values: ProductInputInterface = useFormikContext<
    ProductInputInterface
  >().values;
  const defaultCategory: SelectOptionInterface | null = values.defaultCategory;
  const categories: SelectOptionInterface[] = values.categories;

  const allCategoryIds = _.compact([
    defaultCategory?.value,
    ...categories.map((category) => category.value),
  ]);

  const categoryFilteredAttributes =
    allCategoryIds.length === 0
      ? attributes
      : attributes.filter((attribute) => {
          const commonCategories = _.intersection(
            attribute.associatedCategoryIds,
            allCategoryIds
          );
          return commonCategories.length > 0;
        });

  const attributeOptions = categoryFilteredAttributes.map((attribute) => ({
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
