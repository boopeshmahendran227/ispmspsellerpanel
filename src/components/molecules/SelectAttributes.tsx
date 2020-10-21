import useSWR from "swr";
import {
  AttributeInterface,
  SelectedAttribute,
  ProductInputInterface,
  SelectOptionInterface,
} from "../../types/product";
import Loader from "components/atoms/Loader";
import MultiSelect from "components/atoms/MultiSelect";
import PageError from "../atoms/PageError";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Box, Button, Heading} from "@chakra-ui/core";
import React from "react";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";


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
    <Box>
      <PageHeaderContainer>
        <Heading size="md"> Step 1: Select Attributes</Heading>
        <Button
          variantColor="primaryColorVariant"
          onClick={() => props.showAttributeModal()}
        >
          Create New Attribute
        </Button>
      </PageHeaderContainer>
      <Box>
        <MultiSelect
          value={selectedOption}
          onChange={handleChange}
          options={attributeOptions}
        />
      </Box>
    </Box>
  );
};

export default SelectAttributes;
