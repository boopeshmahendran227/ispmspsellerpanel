import React from "react";
import SortableTable from "components/atoms/SortableTable";
import ProductCard from "components/atoms/ProductCard";

export interface TopSoldItem {
  categoryName: string;
  numberOfOrders: number;
  productId: number;
  productName: string;
  qtySold: number;
  rank: number;
  revenue: number;
  revenueShare: number;
  images: string[];
}

export interface TopSoldProps {
  data: TopSoldItem[];
}

const renderTableBody = (data: TopSoldItem[]) => {
  return data.map((item) => {
    return (
      <tr key={item.productId}>
        <td className="productContainer">
          <ProductCard
            name={item.productName}
            image={item.images[0]}
            metaInfo={[{ key: "Category", value: item.categoryName }]}
          />
        </td>
        <td>{item.qtySold}</td>
        <td>{item.numberOfOrders}</td>
      </tr>
    );
  });
};

const getTableHeaders = () => {
  return [
    {
      name: "Product",
      valueFunc: (item: TopSoldItem) => item.productName,
    },
    {
      name: "Sold Quantity",
      valueFunc: (item: TopSoldItem) => item.qtySold,
    },
    {
      name: "Order Count",
      valueFunc: (item: TopSoldItem) => item.numberOfOrders,
    },
  ];
};

const TopSold = (props: TopSoldProps): JSX.Element => {
  return (
    <SortableTable
      initialSortData={{
        index: 1,
        isAsc: false,
      }}
      headers={getTableHeaders()}
      data={props.data}
      emptyMsg="There are no orders in the selected time period"
      body={renderTableBody}
    />
  );
};
export default TopSold;
