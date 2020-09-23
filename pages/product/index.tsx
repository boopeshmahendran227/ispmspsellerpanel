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
import {
  EcosystemResponseInterface,
  EcosystemDataInterface,
} from "types/business";
import Loader from "components/Loader";
import EcosystemOption from "components/atoms/EcosystemOption";
import Select from "components/Select";
import Checkbox from "components/atoms/Checkbox";
import styled from "styled-components";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageContainer from "components/atoms/PageContainer";

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
  const [selectedEcosystemId, setSelectedEcosystemId] = useState("");
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
  const businessSWR = useSWR<EcosystemResponseInterface>(
    "/businesses/ecosystems/all"
  );
  const ecosystemData: EcosystemResponseInterface | undefined =
    businessSWR.data;
  const productData: PaginatedDataInterface<ProductMiniInterface> | undefined =
    productSWR.data;
  const error = productSWR.error || businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!ecosystemData) {
    return <Loader />;
  }

  const ecosystems: SelectOptionInterface[] = [
    {
      value: "",
      label: "All Ecosystems",
    },
    ...ecosystemData.map((ecosystem: EcosystemDataInterface) => ({
      value: ecosystem._id,
      label: <EcosystemOption ecosystem={ecosystem} />,
    })),
  ];

  const getEcosystemName = (id: string) => {
    const currentEcosystem = ecosystemData.find(
      (ecosystem) => ecosystem._id === selectedEcosystemId
    );

    return currentEcosystem?.ecosystem_name;
  };

  const currentEcosystem =
    ecosystems.find((ecosystem) => ecosystem.value == selectedEcosystemId) ??
    ecosystems[0];

  const getAppliedFilters = (): string[] => {
    const filters: string[] = [];

    if (selectedEcosystemId) {
      filters.push(
        ("Ecosystem: " + getEcosystemName(selectedEcosystemId)) as string
      );
    }
    if (showOnlySelf) {
      filters.push("Only My Products");
    }

    return filters;
  };

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader>Products</PageHeader>
        <div>
          <Link href="/product/new">
            <Button>Add Product</Button>
          </Link>
          <Link href="/product/cloneProduct">
            <Button>Clone Products</Button>
          </Link>
        </div>
      </PageHeaderContainer>
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
      <ActiveFilters
        appliedFilters={getAppliedFilters()}
        clearFilters={() => {
          setShowOnlySelf(false);
          setSelectedEcosystemId("");
        }}
      />
      <ProductsContainer
        productData={productData}
        setCurrentPageNumber={setCurrentPageNumber}
      />
    </PageContainer>
  );
};

export default WithAuth(Products);
