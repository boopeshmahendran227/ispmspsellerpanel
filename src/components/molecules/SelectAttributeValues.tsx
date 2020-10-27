import {
  AttributeInterface,
  SelectedAttribute,
  AttributeValueInterface,
  SelectedAttributeValuesMap,
} from "../../types/product";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import MultiSelect from "../atoms/MultiSelect";
import CreateAttributeValue from "../atoms/CreateAttributeValue";
import PageError from "../atoms/PageError";
import { Box, Text, Heading } from "@chakra-ui/core";
import PageHeader from "components/atoms/PageHeader";

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
    return <PageError statusCode={error.response?.status} />;
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
    <Box>
      <PageHeader>Step 2: Select Attribute Values </PageHeader>
      <Text fontSize={["xs", "sm", "md"]}>
        Select values from each attribute to include in the product. Each unique
        combination of values creates a unique Product SKUs
      </Text>
      {props.selectedAttributes.map((selectedAttribute) => {
        const attribute = attributes.find(
          (attribute) => attribute.id === selectedAttribute.attributeId
        );

        if (!attribute) {
          return null;
        }

        const attributeValues = attribute.values || [];

        return (
          <Box p={2} my={[2, 5]}>
            <Heading size="md" fontWeight="bold">
              {attribute.name}
            </Heading>
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
          </Box>
        );
      })}
    </Box>
  );
};

export default SelectAttributeValues;
