import SortableTable from "./SortableTable";
import {
  ProductSkuDetail,
  ResponseAttributeValuesInterface,
} from "../types/product";
import CSSConstants from "../constants/CSSConstants";
import RelativeImg from "./RelativeImg";
import { formatPrice } from "../utils/misc";

interface SkuTableProps {
  skus: ProductSkuDetail[];
  attributeValues: ResponseAttributeValuesInterface[];
}

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
    {
      name: "Bar Code",
      valueFunc: (sku: ProductSkuDetail) => sku.barCodeIdentifier,
    },
    {
      name: "External Id",
      valueFunc: (sku: ProductSkuDetail) => sku.externalId,
    },
  ];
};

const renderTableBody = (
  attributeValues: ResponseAttributeValuesInterface[],
  skus: ProductSkuDetail[]
) => {
  const getAttributeName = (attributeId: number) => {
    const attribute = attributeValues.find(
      (attributeValue) => attributeValue.attributeId === attributeId
    );
    return attribute?.attributeName;
  };

  const getValue = (valueId: number) => {
    const attribute = attributeValues.find(
      (attributeValue) => attributeValue.valueId === valueId
    );
    return attribute?.value;
  };

  return skus.map((sku) => (
    <tr>
      <td>{sku.skuId}</td>
      <td>
        {sku.attributeValueIds
          .map(
            (attributeValueId) =>
              getAttributeName(attributeValueId.attributeId) +
              ": " +
              getValue(attributeValueId.valueId)
          )
          .join(", ")}
      </td>
      <td>
        <div className="imageContainer">
          {sku.imageRelativePaths.map((image) => (
            <RelativeImg src={image} />
          ))}
        </div>
      </td>
      <td>{formatPrice(sku.price)}</td>
      <td>{formatPrice(sku.boughtPrice)}</td>
      <td>{sku.qty}</td>
      <td>{sku.length}</td>
      <td>{sku.width}</td>
      <td>{sku.height}</td>
      <td>{sku.weight}</td>
      <td>{sku.barCodeIdentifier}</td>
      <td>{sku.externalId}</td>
    </tr>
  ));
};

const SkuTable = (props: SkuTableProps) => {
  const { skus } = props;

  return (
    <div className="container">
      <header>Skus</header>
      <SortableTable
        initialSortData={{
          index: 0,
          isAsc: true,
        }}
        headers={getTableHeaders()}
        data={skus}
        emptyMsg=""
        body={renderTableBody.bind(null, props.attributeValues)}
      />
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

export default SkuTable;
