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
      valueFunc: (product: ProductMiniInterface) => product.id,
    },
    {
      name: "Image",
      valueFunc: (product: ProductMiniInterface) => null,
    },
    {
      name: "Name",
      valueFunc: (product: ProductMiniInterface) => product.name,
    },
    {
      name: "Average Rating",
      valueFunc: (product: ProductMiniInterface) => product.averageRating,
    },
    {
      name: "Short Description",
      valueFunc: (product: ProductMiniInterface) => product.shortDescription,
    },
  ];
};

const renderTableBody = (products: ProductMiniInterface[]) => {
  return products.map((product) => (
    <Link href="/product/[id]" as={`/product/${product.id}`}>
      <tr>
        <td>{product.id}</td>
        <td>
          <div className="imageContainer">
            <RelativeImg src={product.imageRelativePaths[0]} />
          </div>
        </td>
        <td>{product.name}</td>
        <td>{product.averageRating}</td>
        <td>{product.shortDescription}</td>
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
