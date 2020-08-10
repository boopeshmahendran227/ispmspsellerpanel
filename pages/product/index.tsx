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
import styled from "styled-components";

const FlexContainer = styled.div`
  margin: 0.5em 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
`;

const EcosystemFilterContainer = styled.div`
  min-width: 300px;
`;

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
    return <PageError statusCode={error.response?.status} />;
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

  const getAppliedFilters = (): string[] => {
    const filters: string[] = [];

    if (searchText) {
      filters.push(searchText);
    }
    if (selectedEcosystemId) {
      filters.push(("Ecosystem: " + currentEcosystem.value) as string);
    }
    if (showOnlySelf) {
      filters.push("Only My Products");
    }

    return filters;
  };

  return (
    <div className="container">
      <PageHeader>Products</PageHeader>
      <Link href="/product/new">
        <Button>Add Product</Button>
      </Link>
      <ActiveFilters
        appliedFilters={getAppliedFilters()}
        clearFilters={() => setSearchText("")}
      />
      <FlexContainer>
        <SearchBar searchText={searchText} searchByText={setSearchText} />
        <FilterSection>
          <Checkbox
            checked={showOnlySelf}
            onChange={(e) => setShowOnlySelf(e.target.checked)}
            label="Show Only My Products"
          />
          <EcosystemFilterContainer>
            <Select
              value={currentEcosystem}
              onChange={(ecosystem) =>
                setSelectedEcosystemId(ecosystem.value as string)
              }
              options={ecosystems}
            />
          </EcosystemFilterContainer>
        </FilterSection>
      </FlexContainer>
      <ProductsContainer
        productData={productData}
        setCurrentPageNumber={setCurrentPageNumber}
      />
    </div>
  );
};

export default WithAuth(Products);
