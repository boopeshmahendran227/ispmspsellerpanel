import Link from "next/link";
import { ProductMiniInterface, SelectOptionInterface } from "types/product";
import { useState } from "react";
import SearchBar from "components/SearchBar";
import ActiveFilters from "components/ActiveFilters";
import { PaginatedDataInterface } from "types/pagination";
import Button from "components/atoms/Button";
import WithAuth from "components/WithAuth";
import useSWR from "swr";
import { useMemo } from "react";
import PageError from "components/PageError";
import ProductsContainer from "components/ProductsContainer";
import PageHeader from "components/PageHeader";
import { BusinessDataInterface } from "types/business";
import Loader from "components/Loader";
import EcosystemOption from "components/atoms/EcosystemOption";
import Select from "components/Select";
import Checkbox from "components/atoms/Checkbox";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedEcosystemId, setSelectedEcosystemId] = useState("Default");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [showOnlySelf, setShowOnlySelf] = useState(false);

  const params = useMemo(
    () => ({
      method: "POST",
      data: {
        showOnlySelf: showOnlySelf,
        ecosystemId: selectedEcosystemId,
        pageNumber: currentPageNumber,
        searchText: searchText,
      },
    }),
    [searchText, currentPageNumber, selectedEcosystemId, showOnlySelf]
  );

  const productSWR = useSWR<PaginatedDataInterface<ProductMiniInterface>>([
    "/search/seller/product",
    params,
  ]);
  const businessSWR = useSWR<BusinessDataInterface>("/businesses/business");
  const businessData: BusinessDataInterface | undefined = businessSWR.data;
  const productData: PaginatedDataInterface<ProductMiniInterface> | undefined =
    productSWR.data;
  const error = productSWR.error || businessSWR.error;

  if (error) {
    return <PageError statusCode={error?.response.status} />;
  }

  if (!businessData) {
    return <Loader />;
  }

  const ecosystems: SelectOptionInterface[] = [
    {
      value: "Default",
      label: "Istakapaza Default Marketplace",
    },
    ...businessData.ecosystems.map((ecosystem) => ({
      value: ecosystem.ecosystem_id._id,
      label: <EcosystemOption ecosystem={ecosystem} />,
    })),
  ];

  const currentEcosystem =
    ecosystems.find((ecosystem) => ecosystem.value == selectedEcosystemId) ??
    ecosystems[0];

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
      <Select
        value={currentEcosystem}
        onChange={(ecosystem) =>
          setSelectedEcosystemId(ecosystem.value as string)
        }
        options={ecosystems}
      />
      <Checkbox
        checked={showOnlySelf}
        onChange={(e) => setShowOnlySelf(e.target.checked)}
        label="Show Only My Products"
      />
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
