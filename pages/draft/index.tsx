import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import SortableTable from "components/atoms/SortableTable";
import RelativeImg from "components/atoms/RelativeImg";
import Pagination from "components/atoms/Pagination";
import Button from "components/atoms/Button";
import { DraftMiniInterface } from "types/draft";
import { PaginatedDataInterface } from "types/pagination";
import PageHeader from "components/atoms/PageHeader";
import WithAuth from "components/atoms/WithAuth";
import useSWR from "swr";
import { useState } from "react";
import PageError from "components/atoms/PageError";
import Loader from "components/atoms/Loader";
import PageContainer from "components/atoms/PageContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageBodyContainer from "components/atoms/PageBodyContainer";
import { Box } from "@chakra-ui/core";

const Drafts = () => {
  const getTableHeaders = () => {
    return [
      {
        name: "Product Id",
        valueFunc: (product: DraftMiniInterface) => product.id,
      },
      {
        name: "Image",
        valueFunc: (product: DraftMiniInterface) => null,
      },
      {
        name: "Name",
        valueFunc: (product: DraftMiniInterface) => product.name,
      },
      {
        name: "Average Rating",
        valueFunc: (product: DraftMiniInterface) => product.averageRating,
      },
      {
        name: "Short Description",
        valueFunc: (product: DraftMiniInterface) => product.shortDescription,
      },
      {
        name: "Status",
        valueFunc: (product: DraftMiniInterface) => product.status,
      },
    ];
  };

  const renderTableBody = (products: DraftMiniInterface[]) => {
    return products.map((product) => (
      <Link key={product.id} href="/draft/[id]" as={`/draft/${product.id}`}>
        <tr>
          <td>{product.id}</td>
          <td>
            <Box display="inline-flex" w="5rem" h="5rem" alignItems="center">
              <RelativeImg src={product.imageRelativePaths[0]} />
            </Box>
          </td>
          <td>{product.name}</td>
          <td>{product.averageRating}</td>
          <td>{product.shortDescription}</td>
          <td>{product.status}</td>
          <style jsx>{`
            tr:hover {
              background-color: ${CSSConstants.hoverColor} !important;
              cursor: pointer;
            }
          `}</style>
        </tr>
      </Link>
    ));
  };

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const swr = useSWR<PaginatedDataInterface<DraftMiniInterface>>(
    `/product/draft?pageNumber=${currentPageNumber}`
  );

  const draftData: PaginatedDataInterface<DraftMiniInterface> | undefined =
    swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!draftData) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader>Product Drafts</PageHeader>
        <div>
          <Link href="/product/new">
            <Button>Add Product</Button>
          </Link>
        </div>
      </PageHeaderContainer>
      <PageBodyContainer>
        <SortableTable
          initialSortData={{
            index: 1,
            isAsc: false,
          }}
          headers={getTableHeaders()}
          data={draftData.results}
          emptyMsg="No product Drafts found"
          body={renderTableBody}
        />
        <Pagination data={draftData} onChange={setCurrentPageNumber} />
      </PageBodyContainer>
    </PageContainer>
  );
};

export default WithAuth(Drafts);
