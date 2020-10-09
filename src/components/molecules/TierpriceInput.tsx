import { ArrayHelpers } from "formik";
import FieldNumInput from "../atoms/FieldNumInput";
import FieldPercentageInput from "../atoms/FieldPercentageInput";
import FieldEditableArray from "./FieldEditableArray";
import CSSConstants from "../../constants/CSSConstants";
import { Box, Heading, Divider } from "@chakra-ui/core";

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
    <Box mb="3em">
      <Heading size="lg">Tier Price</Heading>
      <Divider borderWidth="3px" />
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
