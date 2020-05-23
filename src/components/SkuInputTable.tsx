import SortableTable from "./SortableTable";
import { ProductSkuDetail } from "../types/product";
import CSSConstants from "../constants/CSSConstants";
import { ErrorMessage, FieldArray, useFormikContext } from "formik";
import Button from "./Button";
import { connect } from "react-redux";
import UIActions from "../actions/ui";
import FieldInput from "./FieldInput";
import ValidationErrorMsg from "./ValidationErrorMsg";

interface DispatchProps {
  showSkuModal: () => void;
}

type SkuInputTableProps = DispatchProps;

const getTableHeaders = () => {
  return [
    {
      name: "Sku Id",
      valueFunc: (sku: ProductSkuDetail) => sku.skuId,
    },
    {
      name: "Attributes",
      valueFunc: (sku: ProductSkuDetail) => null,
    },
    {
      name: "Image",
      valueFunc: (sku: ProductSkuDetail) => null,
    },
    {
      name: "Price",
      valueFunc: (sku: ProductSkuDetail) => sku.price,
    },
    {
      name: "Bought Price",
      valueFunc: (sku: ProductSkuDetail) => sku.boughtPrice,
    },
    {
      name: "Quantity",
      valueFunc: (sku: ProductSkuDetail) => sku.qty,
    },
    {
      name: "Length",
      valueFunc: (sku: ProductSkuDetail) => sku.length,
    },
    {
      name: "Width",
      valueFunc: (sku: ProductSkuDetail) => sku.width,
    },
    {
      name: "Height",
      valueFunc: (sku: ProductSkuDetail) => sku.height,
    },
    {
      name: "Weight",
      valueFunc: (sku: ProductSkuDetail) => sku.weight,
    },
  ];
};

const renderTableBody = (skus: ProductSkuDetail[]) => {
  return (
    <FieldArray
      name="skus"
      render={(arrayHelpers) =>
        skus.map((sku, index) => (
          <tr>
            <td>{sku.skuId}</td>
            <td>
              {sku.attributeValueIds
                .map(
                  (attributeValueId) =>
                    attributeValueId.attributeName +
                    ":" +
                    attributeValueId.value
                )
                .join(", ")}
            </td>
            <td>
              <FieldArray
                name={`skus.${index}.imageRelativePaths`}
                render={(arrayHelpers) => {
                  const images = sku.imageRelativePaths;
                  return (
                    <div className="imageInputContainer">
                      {images.map((image, index) => (
                        <div key={index} className="imageInputField">
                          <FieldInput
                            name={`skus.${index}.imageRelativePaths.${index}`}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <i className="fa fa-trash" />
                            </button>
                          )}
                        </div>
                      ))}
                      <a onClick={() => arrayHelpers.push("")}>
                        {images.length === 0 ? "+ Add" : "Add another"}
                      </a>
                      <ErrorMessage
                        component={ValidationErrorMsg}
                        name={`skus.${index}.imageRelativePaths`}
                      />
                    </div>
                  );
                }}
              />
            </td>
            <td>
              <FieldInput name={`skus.${index}.price`} />
            </td>
            <td>
              <FieldInput name={`skus.${index}.boughtPrice`} />
            </td>
            <td>
              <FieldInput name={`skus.${index}.qty`} />
            </td>
            <td>
              <FieldInput name={`skus.${index}.length`} />
            </td>
            <td>
              <FieldInput name={`skus.${index}.width`} />
            </td>
            <td>
              <FieldInput name={`skus.${index}.height`} />
            </td>
            <td>
              <FieldInput name={`skus.${index}.weight`} />
            </td>
            <style jsx>{`
              tr:hover {
                background-color: ${CSSConstants.hoverColor} !important;
                cursor: pointer;
              }
              .imageInputContainer a {
                display: block;
                text-align: left;
              }
              .imageInputField {
                display: flex;
              }
            `}</style>
          </tr>
        ))
      }
    />
  );
};

const SkuInputTable = (props: SkuInputTableProps) => {
  const { values } = useFormikContext();
  const skus = values.skus;

  return (
    <div className="container">
      <header>Skus</header>
      <div className="buttonContainer">
        <Button onClick={props.showSkuModal}>Generate SKUs</Button>
      </div>
      {skus.length > 0 && (
        <SortableTable
          initialSortData={{
            index: 0,
            isAsc: true,
          }}
          headers={getTableHeaders()}
          data={skus}
          emptyMsg=""
          body={renderTableBody}
        />
      )}
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
  );
};

const mapDispatchToProps: DispatchProps = {
  showSkuModal: UIActions.showSkuModal,
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(SkuInputTable);
