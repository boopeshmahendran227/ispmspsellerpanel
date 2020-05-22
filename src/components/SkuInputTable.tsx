import SortableTable from "./SortableTable";
import { ProductSkuDetail } from "../types/product";
import CSSConstants from "../constants/CSSConstants";
import { Field, FieldArray, useFormikContext } from "formik";

const getTableHeaders = () => {
  return [
    {
      name: "Sku Id",
      valueFunc: (sku: ProductSkuDetail) => sku.skuId,
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
            <td>{""}</td>
            <td>
              <Field name={`sku.${index}.price`} />
            </td>
            <td>
              <Field name={`sku.${index}.boughtPrice`} />
            </td>
            <td>
              <Field name={`sku.${index}.qty`} />
            </td>
            <td>
              <Field name={`sku.${index}.length`} />
            </td>
            <td>
              <Field name={`sku.${index}.width`} />
            </td>
            <td>
              <Field name={`sku.${index}.height`} />
            </td>
            <td>
              <Field name={`sku.${index}.weight`} />
            </td>
            <style jsx>{`
              tr:hover {
                background-color: ${CSSConstants.hoverColor} !important;
                cursor: pointer;
              }
            `}</style>
          </tr>
        ))
      }
    />
  );
};

const SkuInputTable = () => {
  const { values } = useFormikContext();
  const skus = values.skus;

  return (
    <SortableTable
      initialSortData={{
        index: 1,
        isAsc: false,
      }}
      headers={getTableHeaders()}
      data={skus}
      emptyMsg="There are no orders"
      body={renderTableBody}
    />
  );
};

export default SkuInputTable;
