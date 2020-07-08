import Button from "./Button";
import { FieldArray, useFormikContext } from "formik";
import { TierPriceInterface, ProductInputInterface } from "../types/product";
import CSSConstants from "../constants/CSSConstants";
import FieldNumInput from "./FieldNumInput";
import FieldPercentageInput from "./FieldPercentageInput";

const TierPriceInput = () => {
  const values: ProductInputInterface = useFormikContext<
    ProductInputInterface
  >().values;

  const tierPrices: TierPriceInterface[] = values.tierPrices;

  const handleAdd = (arrayHelpers) => {
    arrayHelpers.push({
      minQty: 0,
      discountPercentage: 0,
    });
  };

  const handleDelete = (arrayHelpers, index: number) => {
    arrayHelpers.remove(index);
  };

  return (
    <FieldArray
      name="tierPrices"
      render={(arrayHelpers) => (
        <div className="container">
          <header>Tier Price</header>
          <div className="inputContainer">
            <table>
              {tierPrices.length > 0 && (
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Min Qty</th>
                    <th>Discount Percentage</th>
                    <th></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {tierPrices.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <FieldNumInput name={`tierPrices.${index}.minQty`} />
                    </td>
                    <td>
                      <FieldPercentageInput
                        name={`tierPrices.${index}.discountPercentage`}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(arrayHelpers, index)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="buttonContainer">
              <Button onClick={() => handleAdd(arrayHelpers)}>
                {tierPrices.length === 0
                  ? "Add Tier price rule"
                  : "Add one more tier price rule"}
              </Button>
            </div>
          </div>
          <style jsx>{`
            .container {
              margin: 3em 0;
              font-size: 1.1rem;
            }
            header {
              font-weight: bold;
              font-size: 1.3rem;
              border-bottom: 1px solid ${CSSConstants.borderColor};
              padding: 0.3em;
              margin-bottom: 1em;
            }
          `}</style>
        </div>
      )}
    />
  );
};

export default TierPriceInput;
