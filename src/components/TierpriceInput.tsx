import { ArrayHelpers } from "formik";
import FieldNumInput from "./FieldNumInput";
import FieldPercentageInput from "./FieldPercentageInput";
import FieldEditableArray from "./FieldEditableArray";
import CSSConstants from "../constants/CSSConstants";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";
import SectionHeader from "./atoms/SectionHeader";

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
    <div className="container">
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
      <style jsx>{`
        header {
          font-weight: bold;
          font-size: 1.3rem;
          border-bottom: 1px solid ${CSSConstants.borderColor};
          padding: 0.3em;
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
};

export default TierPriceInput;
