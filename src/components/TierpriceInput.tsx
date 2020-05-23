import Button from "./Button";
import { FieldArray, useFormikContext, Field } from "formik";
import { TierPriceInterface } from "../types/product";
import CSSConstants from "../constants/CSSConstants";

const TierPriceInput = () => {
  const { values } = useFormikContext();

  const tierPrice: TierPriceInterface[] = values.tierPrice;

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
      name="tierPrice"
      render={(arrayHelpers) => (
        <div className="container">
          <header>Tier Price</header>
          <div className="inputContainer">
            <table>
              {tierPrice.length > 0 && (
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
                {tierPrice.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Field name={`tierPrice.${index}.minQty`} />
                    </td>
                    <td>
                      <Field name={`tierPrice.${index}.discountPercentage`} />
                    </td>
                    <td>
                      <button onClick={() => handleDelete(arrayHelpers, index)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="buttonContainer">
              <Button onClick={() => handleAdd(arrayHelpers)}>
                {tierPrice.length === 0
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
            .inputContainer {
              margin: 0 1em;
            }
          `}</style>
        </div>
      )}
    />
  );
};

export default TierPriceInput;
