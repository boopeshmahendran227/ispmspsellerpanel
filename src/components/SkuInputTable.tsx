import SortableTable from "./SortableTable";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { ProductSkuDetail } from "../types/product";
import { getSkus } from "../selectors/product";
import CSSConstants from "../constants/CSSConstants";

interface StateProps {
  skus: ProductSkuDetail[];
}

interface DispatchProps {}

type SkuInputTableProps = StateProps & DispatchProps;

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
  return skus.map((sku) => (
    <tr>
      <td>{sku.skuId}</td>
      <td>{""}</td>
      <td>{sku.price}</td>
      <td>{sku.boughtPrice}</td>
      <td>{sku.qty}</td>
      <td>{sku.length}</td>
      <td>{sku.width}</td>
      <td>{sku.height}</td>
      <td>{sku.weight}</td>
      <style jsx>{`
        tr:hover {
          background-color: ${CSSConstants.hoverColor} !important;
          cursor: pointer;
        }
      `}</style>
    </tr>
  ));
};

const SkuInputTable = (props: SkuInputTableProps) => {
  return (
    <SortableTable
      initialSortData={{
        index: 1,
        isAsc: false,
      }}
      headers={getTableHeaders()}
      data={props.skus}
      emptyMsg="There are no orders"
      body={renderTableBody}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  skus: getSkus(state),
});

export default connect(mapStateToProps, null)(SkuInputTable);
