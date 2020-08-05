import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import SortableTable from "../../src/components/SortableTable";
import { ProductMiniInterface } from "../../src/types/product";
import { useState } from "react";
import SearchBar from "../../src/components/SearchBar";
import RelativeImg from "../../src/components/RelativeImg";
import Pagination from "../../src/components/Pagination";
import ActiveFilters from "../../src/components/ActiveFilters";
import { PaginatedDataInterface } from "../../src/types/pagination";
import Button from "../../src/components/Button";
import WithAuth from "../../src/components/WithAuth";
import useSWR from "swr";
import { useMemo } from "react";
import PageError from "../../src/components/PageError";
import Loader from "../../src/components/Loader";

const Products = () => {
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
    ));
  };

  const [searchText, setSearchText] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const params = useMemo(
    () => ({
      method: "POST",
      data: {
        searchText: searchText,
        categoryId: 1,
        pageNumber: currentPageNumber,
        orderByPrice: 0,
        attributeFilters: [],
        brandId: [],
        sellerIds: [],
      },
    }),
    [searchText, currentPageNumber]
  );

  const swr = useSWR(["/product/search/seller", params]);
  const productData: PaginatedDataInterface<ProductMiniInterface> = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error?.response.status} />;
  }

  if (!productData) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="addProductContainer">
        <Link href="/product/new">
          <Button>Add Product</Button>
        </Link>
      </div>
      <ActiveFilters
        searchText={searchText}
        clearFilters={() => setSearchText("")}
      />
      <SearchBar searchText={searchText} searchByText={setSearchText} />
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
      <Pagination data={productData} onChange={setCurrentPageNumber} />
      <style jsx>{`
        .container {
          padding: 1em;
          margin: 1em auto;
          font-size: 0.9rem;
          background: ${CSSConstants.foregroundColor};
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        .addProductContainer {
          text-align: right;
          padding: 0.4em 3em;
          font-size: 1rem;
        }
        @media (max-width: 800px) {
          .container {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WithAuth(Products);
