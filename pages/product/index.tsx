import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import { ProductMiniInterface } from "../../src/types/product";
import { useState } from "react";
import SearchBar from "../../src/components/SearchBar";
import ActiveFilters from "../../src/components/ActiveFilters";
import { PaginatedDataInterface } from "../../src/types/pagination";
import Button from "../../src/components/Button";
import WithAuth from "../../src/components/WithAuth";
import useSWR from "swr";
import { useMemo } from "react";
import PageError from "../../src/components/PageError";
import ProductsContainer from "../../src/components/ProductsContainer";

const Products = () => {
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
      <ProductsContainer
        productData={productData}
        setCurrentPageNumber={setCurrentPageNumber}
      />
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
