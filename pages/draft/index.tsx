import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import SortableTable from "../../src/components/SortableTable";
import RelativeImg from "../../src/components/RelativeImg";
import Pagination from "../../src/components/Pagination";
import Button from "../../src/components/atoms/Button";
import { DraftMiniInterface } from "../../src/types/draft";
import { PaginatedDataInterface } from "../../src/types/pagination";
import PageHeader from "../../src/components/PageHeader";
import WithAuth from "../../src/components/WithAuth";
import useSWR from "swr";
import { useState } from "react";
import PageError from "../../src/components/PageError";
import Loader from "../../src/components/Loader";

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
            <div className="imageContainer">
              <RelativeImg src={product.imageRelativePaths[0]} />
            </div>
          </td>
          <td>{product.name}</td>
          <td>{product.averageRating}</td>
          <td>{product.shortDescription}</td>
          <td>{product.status}</td>
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

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const swr = useSWR(`/product/draft?pageNumber=${currentPageNumber}`);

  const draftData: PaginatedDataInterface<DraftMiniInterface> = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!draftData) {
    return <Loader />;
  }

  return (
    <div className="container">
      <PageHeader>Product Drafts</PageHeader>
      <div className="addProductContainer">
        <Link href="/product/new">
          <Button>Add Product</Button>
        </Link>
      </div>
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

export default WithAuth(Drafts);
