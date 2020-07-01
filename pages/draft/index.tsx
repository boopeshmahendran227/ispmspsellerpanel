import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import SortableTable from "../../src/components/SortableTable";
import DraftActions from "../../src/actions/draft";
import RelativeImg from "../../src/components/RelativeImg";
import Pagination from "../../src/components/Pagination";
import Button from "../../src/components/Button";
import { getDrafts, getDraftPaginationData } from "../../src/selectors/draft";
import { RequestReducerState } from "../../src/reducers/utils";
import WithReduxDataLoader from "../../src/components/WithReduxDataLoader";
import { DraftMiniInterface } from "../../src/types/draft";
import { PaginationDataInterface } from "../../src/types/pagination";
import PageHeader from "../../src/components/PageHeader";
import WithAuth from "../../src/components/WithAuth";

interface StateProps {
  drafts: DraftMiniInterface[];
  getDraftsLoadingState: RequestReducerState;
  draftPaginationData: PaginationDataInterface;
}

interface DispatchProps {
  getDrafts: () => void;
  setDraftCurrentPageNumber: (value: number) => void;
}

type DraftsProps = StateProps & DispatchProps;

const Drafts = (props: DraftsProps) => {
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

  const { drafts } = props;

  if (!drafts) {
    return null;
  }

  return (
    <div className="container">
      <div className="addProductContainer">
        <Link href="/product/new">
          <Button>Add Product</Button>
        </Link>
      </div>
      <PageHeader>Product Drafts</PageHeader>
      <SortableTable
        initialSortData={{
          index: 1,
          isAsc: false,
        }}
        headers={getTableHeaders()}
        data={drafts}
        emptyMsg="No product Drafts found"
        body={renderTableBody}
      />
      <Pagination
        data={props.draftPaginationData}
        onChange={props.setDraftCurrentPageNumber}
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

const mapStateToProps = (state: RootState): StateProps => ({
  drafts: getDrafts(state),
  getDraftsLoadingState: state.draft.drafts,
  draftPaginationData: getDraftPaginationData(state),
});

const mapDispatchToProps: DispatchProps = {
  getDrafts: DraftActions.getDrafts,
  setDraftCurrentPageNumber: DraftActions.setDraftCurrentPageNumber,
};

const mapPropsToLoadData = (props: DraftsProps) => {
  return [
    {
      data: props.drafts,
      fetch: props.getDrafts,
      loadingState: props.getDraftsLoadingState,
    },
  ];
};

export default WithAuth(
  connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxDataLoader(mapPropsToLoadData)(Drafts))
);
