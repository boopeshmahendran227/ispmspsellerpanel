import SortableTable from "./SortableTable";
import { ProductSkuDetail, ProductInputInterface } from "../types/product";
import CSSConstants from "../constants/CSSConstants";
import { ErrorMessage, FieldArray, useFormikContext } from "formik";
import Button from "./atoms/Button";
import { connect } from "react-redux";
import UIActions from "../actions/ui";
import FieldInput from "./FieldInput";
import ValidationErrorMsg from "./ValidationErrorMsg";
import FieldNumInput from "./FieldNumInput";
import FieldPriceInput from "./FieldPriceInput";
import FieldPercentageInput from "./FieldPercentageInput";
import SectionHeaderContainer from "./atoms/SectionHeaderContainer";
import SectionHeader from "./atoms/SectionHeader";

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
    {
      name: "Bar Code",
      valueFunc: (sku: ProductSkuDetail) => sku.barCodeIdentifier,
    },
    {
      name: "External Id",
      valueFunc: (sku: ProductSkuDetail) => sku.externalId,
    },
    {
      name: "Special Discount Price",
      valueFunc: (sku: ProductSkuDetail) => sku.specialDiscount,
    },
    {
      name: "Special Discount Percentage",
      valueFunc: (sku: ProductSkuDetail) => sku.specialDiscountPercentage,
    },
  ];
};

const renderTableBody = (skus: ProductSkuDetail[]) => {
  return (
    <FieldArray
      name="skus"
      render={(arrayHelpers) =>
        skus.map((sku, skuIndex) => (
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
              <FieldPriceInput name={`skus.${skuIndex}.price`} />
            </td>
            <td>
              <FieldPriceInput name={`skus.${skuIndex}.boughtPrice`} />
            </td>
            <td>
              <FieldNumInput name={`skus.${skuIndex}.qty`} />
            </td>
            <td>
              <FieldNumInput name={`skus.${skuIndex}.length`} />
            </td>
            <td>
              <FieldNumInput name={`skus.${skuIndex}.width`} />
            </td>
            <td>
              <FieldNumInput name={`skus.${skuIndex}.height`} />
            </td>
            <td>
              <FieldNumInput name={`skus.${skuIndex}.weight`} />
            </td>
            <td>
              <FieldInput name={`skus.${skuIndex}.barCodeIdentifier`} />
            </td>
            <td>
              <FieldInput name={`skus.${skuIndex}.externalId`} />
            </td>
            <td>
              <FieldPriceInput name={`skus.${skuIndex}.specialDiscount`} />
            </td>
            <td>
              <FieldPercentageInput
                name={`skus.${skuIndex}.specialDiscountPercentage`}
              />
            </td>
            <style jsx>{`
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
  const values: ProductInputInterface = useFormikContext<
    ProductInputInterface
  >().values;
  const skus = values.skus;

  return (
    <div className="container">
      <SectionHeaderContainer>
        <SectionHeader>Variants</SectionHeader>
      </SectionHeaderContainer>
      <div className="buttonContainer">
        <Button onClick={props.showSkuModal}>Generate Variants</Button>
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
      <ErrorMessage component={ValidationErrorMsg} name="skus" />
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
