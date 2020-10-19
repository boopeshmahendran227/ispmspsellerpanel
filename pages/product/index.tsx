import Link from "next/link";
import { ProductMiniInterface, SelectOptionInterface } from "types/product";
import { useState, useEffect } from "react";
import SearchBar from "components/molecules/SearchBar";
import ActiveFilters from "components/atoms/ActiveFilters";
import { PaginatedDataInterface } from "types/pagination";
import WithAuth from "components/atoms/WithAuth";
import useSWR from "swr";
import { useMemo } from "react";
import PageError from "components/atoms/PageError";
import ProductsContainer from "components/molecules/ProductsContainer";
import PageHeader from "components/atoms/PageHeader";
import {
  EcosystemResponseInterface,
  EcosystemDataInterface,
} from "types/business";
import Loader from "components/atoms/Loader";
import EcosystemOption from "components/atoms/EcosystemOption";
import Select from "components/atoms/Select";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageContainer from "components/atoms/PageContainer";
import { Flex, Box, Checkbox, Button, Stack } from "@chakra-ui/core";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedEcosystemId, setSelectedEcosystemId] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [showOnlySelf, setShowOnlySelf] = useState(true);

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

  useEffect(() => {
    // Reset current page to 1 whenever filter changes
    setCurrentPageNumber(1);
  }, [searchText, selectedEcosystemId, showOnlySelf]);

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
        <PageHeader>Products </PageHeader>
        <Stack direction="row" spacing={[5, 3]}>
          <Box>
            <Link href="/product/new">
              <Button variantColor="primaryColorVariant">Add Product</Button>
            </Link>
          </Box>
          <Box>
            <Link href="/product/cloneProduct">
              <Button
                variantColor="primaryColorVariant"
               
              >
                Clone Products
              </Button>
            </Link>
          </Box>
        </Stack>
      </PageHeaderContainer>
      <Stack
        spacing={3}
        my={5}
        flexDirection={["column", "row"]}
        justify="space-between"
      >
        <Box textAlign="center">
          <SearchBar searchText={searchText} searchByText={setSearchText} />
        </Box>
        <Stack
          spacing={3}
          flexDirection={["column-reverse", "column-reverse", "column", "row"]}
          alignItems="flex-end"
          mr={[2]}
        >
          <Checkbox
            mt={[5, 0]}
            fontSize={["xs", "md"]}
            isChecked={showOnlySelf}
            onChange={(e) => setShowOnlySelf(e.target.checked)}
          >
            Show Only My Products
          </Checkbox>

          <Box minW={["200px", "280px"]}>
            <Select
              value={currentEcosystem}
              onChange={(ecosystem) =>
                setSelectedEcosystemId(ecosystem.value as string)
              }
              options={ecosystems}
            />
          </Box>
        </Stack>
      </Stack>
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
