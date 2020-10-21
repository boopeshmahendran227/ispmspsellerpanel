import SortableTable from "../atoms/SortableTable";
import { ProductSkuDetail, ProductInputInterface } from "../../types/product";
import { ErrorMessage, FieldArray, useFormikContext } from "formik";
import { connect } from "react-redux";
import UIActions from "../../actions/ui";
import FieldInput from "../atoms/FieldInput";
import ValidationErrorMsg from "../atoms/ValidationErrorMsg";
import FieldNumInput from "../atoms/FieldNumInput";
import FieldPriceInput from "../atoms/FieldPriceInput";
import FieldPercentageInput from "../atoms/FieldPercentageInput";
import SectionHeaderContainer from "../atoms/SectionHeaderContainer";
import SectionHeader from "../atoms/SectionHeader";
import { Box, Divider, Button } from "@chakra-ui/core";

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
    <Box my={3} fontSize="md">
      <SectionHeaderContainer>
        <SectionHeader>Variants</SectionHeader>
        <Divider borderColor="borderColor.500" />
      </SectionHeaderContainer>
      <Box>
        <Button variantColor="primaryColorVariant" onClick={props.showSkuModal}>
          Generate Variants
        </Button>
      </Box>
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
    </Box>
  );
};

const mapDispatchToProps: DispatchProps = {
  showSkuModal: UIActions.showSkuModal,
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps
)(SkuInputTable);
