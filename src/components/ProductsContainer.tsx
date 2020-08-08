import { ProductMiniInterface } from "../types/product";
import SortableTable from "../../src/components/SortableTable";
import Pagination from "../../src/components/Pagination";
import RelativeImg from "../../src/components/RelativeImg";
import CSSConstants from "../../src/constants/CSSConstants";
import Loader from "./Loader";
import Link from "next/link";
import { PaginatedDataInterface } from "../types/pagination";

interface ProductsContainerProps {
  productData: PaginatedDataInterface<ProductMiniInterface>;
  setCurrentPageNumber: (pageNumber: number) => void;
}

const getTableHeaders = () => {
  return [
    {
      name: "Product Id",
      valueFunc: (product: ProductMiniInterface) => product.productId,
    },
    {
      name: "Image",
      valueFunc: (product: ProductMiniInterface) => null,
    },
    {
      name: "Name",
      valueFunc: (product: ProductMiniInterface) => product.productName,
    },
    {
      name: "Short Description",
      valueFunc: (product: ProductMiniInterface) =>
        product.productShortDescription,
    },
  ];
};

const renderTableBody = (products: ProductMiniInterface[]) => {
  return products.map((product) => (
    <Link href="/product/[id]" as={`/product/${product.productId}`}>
      <tr>
        <td>{product.productId}</td>
        <td>
          <div className="imageContainer">
            <RelativeImg src={product.productImages[0]} />
          </div>
        </td>
        <td>{product.productName}</td>
        <td>{product.productShortDescription}</td>
        <style jsx>{`
          .imageContainer {
            display: inline-flex;
            width: 5rem;
            height: 5rem;
            align-items: center;
          }
          tr:hover {
            background-color: ${CSSConstants.hoverColor} !important;
            cursor: pointer;
          }
        `}</style>
      </tr>
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
