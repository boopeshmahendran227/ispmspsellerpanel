import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import { ProductMiniInterface } from "../../src/types/product";
import { useState } from "react";
import SearchBar from "../../src/components/SearchBar";
import ActiveFilters from "../../src/components/ActiveFilters";
import { PaginatedDataInterface } from "../../src/types/pagination";
import Button from "../../src/components/atoms/Button";
import WithAuth from "../../src/components/WithAuth";
import useSWR from "swr";
import { useMemo } from "react";
import PageError from "../../src/components/PageError";
import ProductsContainer from "../../src/components/ProductsContainer";
import PageHeader from "../../src/components/PageHeader";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const params = useMemo(
    () => ({
      method: "POST",
      data: {
        showOnlySelf: false,
        ecosystemId: "Default",
        pageNumber: currentPageNumber,
        searchText: searchText,
      },
    }),
    [searchText, currentPageNumber]
  );

  const swr = useSWR(["/search/seller/product", params]);
  const productData: PaginatedDataInterface<ProductMiniInterface> = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error?.response.status} />;
  }

  return (
    <div className="container">
      <PageHeader>Products</PageHeader>
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
        .addProductContainer {
          text-align: right;
          padding: 0.4em 3em;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default WithAuth(Products);
