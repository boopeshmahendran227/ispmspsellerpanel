import { ArrayHelpers } from "formik";
import FieldNumInput from "../atoms/FieldNumInput";
import FieldPercentageInput from "../atoms/FieldPercentageInput";
import FieldEditableArray from "./FieldEditableArray";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";
import SectionHeader from "./atoms/SectionHeader";
import{Box}from "@chakra-ui/core"
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
    <Box mb="0.3em">
      <SectionHeaderContainer>
        <SectionHeader>Tier Price</SectionHeader>
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
