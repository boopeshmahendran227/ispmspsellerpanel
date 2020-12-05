import { ProductMiniInterface } from "../../types/product";
import SortableTable from "components/atoms/SortableTable";
import Pagination from "components/atoms/Pagination";
import CSSConstants from "../../constants/CSSConstants";
import Loader from "../atoms/Loader";
import Link from "next/link";
import { PaginatedDataInterface } from "../../types/pagination";
import ProductCard from "../atoms/ProductCard";
import { Box } from "@chakra-ui/core";

interface ProductsContainerProps {
  productData: PaginatedDataInterface<ProductMiniInterface> | undefined;
  setCurrentPageNumber: (pageNumber: number) => void;
}

const getTableHeaders = () => {
  return [
    {
      name: "Id",
      valueFunc: (product: ProductMiniInterface) => product.productId,
    },
    {
      name: "Product",
      valueFunc: (product: ProductMiniInterface) => null,
    },
    {
      name: "Short Description",
      valueFunc: (product: ProductMiniInterface) =>
        product.productShortDescription,
    },
    {
      name: "Status",
      valueFunc: (product: ProductMiniInterface) => product.isActive,
    },
  ];
};

const renderTableBody = (products: ProductMiniInterface[]) => {
  return products.map((product) => (
    <Link href="/product/[id]" as={`/product/${product.productId}`}>
      <Box
        as="tr"
        opacity={product.isActive ? 1 : 0.5}
        bg={product.isActive ? "inhert" : "borderColor.100"}
      >
        <td>{product.productId}</td>
        <td>
          <ProductCard
            name={product.productName}
            image={product.productImages[0]}
          />
        </td>
        <td>{product.productShortDescription}</td>
        <td>{product.isActive ? "Active" : "Inactive"}</td>
        <style jsx>{`
          tr:hover {
            background-color: ${CSSConstants.hoverColor} !important;
            cursor: pointer;
          }
        `}</style>
      </Box>
    </Link>
  ));
};

const ProductsContainer = (props: ProductsContainerProps) => {
  const { productData } = props;

  if (!productData) {
    return <Loader />;
  }

  return (
    <>
      <SortableTable
        initialSortData={{
          index: 1,
          isAsc: false,
        }}
        headers={getTableHeaders()}
        data={productData.results}
        emptyMsg="No products found for the given query"
        body={renderTableBody}
      />
      <Pagination data={productData} onChange={props.setCurrentPageNumber} />
    </>
  );
};

export default ProductsContainer;
