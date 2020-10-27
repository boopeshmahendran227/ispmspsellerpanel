import { ArrayHelpers } from "formik";
import FieldNumInput from "../atoms/FieldNumInput";
import FieldPercentageInput from "../atoms/FieldPercentageInput";
import FieldEditableArray from "./FieldEditableArray";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import SectionHeader from "../atoms/SectionHeader";
import { Box, Divider } from "@chakra-ui/core";
import React from "react";

const TierPriceInput = () => {
  const addTierPrice = (arrayHelpers: ArrayHelpers) => {
    arrayHelpers.push({
      minQty: 0,
      discountPercentage: 0,
    });
  };

  const renderTierPriceRow = (index: number) => {
    return (
      <>
        <td>{index + 1}</td>
        <td>
          <FieldNumInput name={`tierPrices.${index}.minQty`} />
        </td>
        <td>
          <FieldPercentageInput
            name={`tierPrices.${index}.discountPercentage`}
          />
        </td>
      </>
    );
  };

  return (
    <Box mb={3}>
      <SectionHeaderContainer>
        <SectionHeader>Tier Price</SectionHeader>
        <Divider borderColor="borderColor.500" />
      </SectionHeaderContainer>
      <FieldEditableArray
        headers={["S.no", "MinQty", "Discount Percentage"]}
        name="tierPrices"
        onAdd={addTierPrice}
        renderInputRow={renderTierPriceRow}
        label="Tier Price"
      />
    </Box>
  );
};

export default TierPriceInput;
