import { ArrayHelpers } from "formik";
import FieldNumInput from "./FieldNumInput";
import FieldPercentageInput from "./FieldPercentageInput";
import FieldEditableArray from "./FieldEditableArray";

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
    <FieldEditableArray
      title="Tier Price"
      headers={["S.no", "MinQty", "Discount Percentage"]}
      name="tierPrices"
      handleAdd={addTierPrice}
      renderInputRow={renderTierPriceRow}
    />
  );
};

export default TierPriceInput;
