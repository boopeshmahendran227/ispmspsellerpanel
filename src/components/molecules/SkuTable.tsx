import SortableTable from "../atoms/SortableTable";
import { ProductSkuDetail } from "../../types/product";
import CSSConstants from "../../constants/CSSConstants";
import RelativeImg from "../atoms/RelativeImg";
import { formatPrice } from "utils/misc";
import { DraftAttributeValuesInterface } from "../../types/draft";
import { AttributeValueID } from "types/sku";
import { Box, Divider, Heading } from "@chakra-ui/core";

interface SkuTableProps {
  skus: ProductSkuDetail[];
  attributeValues: DraftAttributeValuesInterface[];
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

const renderTableBody = (
  attributeValues: AttributeValueID[],
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
      <td>{sku.specialDiscount}</td>
      <td>{sku.specialDiscountPercentage}</td>
    </tr>
  ));
};

const SkuTable = (props: SkuTableProps) => {
  const { skus } = props;

  return (
    <Box className="container" fontSize="1.1rem">
      <Heading size="lg" p="0.3rem">
        Skus
      </Heading>
      <Divider borderWidth="2px" borderColor={CSSConstants.borderColor} />
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
    </Box>
  );
};

export default SkuTable;
