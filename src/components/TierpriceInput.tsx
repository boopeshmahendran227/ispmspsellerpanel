import Button from "./Button";
import { FieldArray, useFormikContext, Field } from "formik";
import { TierPriceInterface } from "../types/product";

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
          <div className="label">Tier Price:</div>
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
              margin: 1em 0;
              width: 100%;
              font-size: 1.1rem;
              display: flex;
              align-items: center;
            }
            .label {
              display: inline-block;
              font-weight: 500;
              min-width: 200px;
              text-align: right;
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
