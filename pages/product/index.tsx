import { connect } from "react-redux";
import { RootState } from "../../src/reducers";
import {
  getSearchResults,
  getSearchPaginationData,
  getFilterData,
} from "../../src/selectors/search";
import CSSConstants from "../../src/constants/CSSConstants";
import Link from "next/link";
import SortableTable from "../../src/components/SortableTable";
import { ProductMiniInterface } from "../../src/types/product";
import SearchActions from "../../src/actions/search";
import { useEffect } from "react";
import SearchBar from "../../src/components/SearchBar";
import RelativeImg from "../../src/components/RelativeImg";
import Pagination from "../../src/components/Pagination";
import ActiveFilters from "../../src/components/ActiveFilters";
import { PaginationDataInterface } from "../../src/types/pagination";
import { FilterDataInterface } from "../../src/types/search";
import Button from "../../src/components/Button";

interface StateProps {
  products: ProductMiniInterface[];
  searchPaginationData: PaginationDataInterface;
  filterData: FilterDataInterface;
}

interface DispatchProps {
  searchByText: (text: string) => void;
  setSearchCurrentPageNumber: (value: number) => void;
  clearFilters: () => void;
}

type ProductsProps = StateProps & DispatchProps;

const Products = (props: ProductsProps) => {
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
      <Link key={product.id} href="/product/[id]" as={`/product/${product.id}`}>
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
      </Link>
    ));
  };

  const { products } = props;

  // init search
  useEffect(() => {
    props.searchByText("");
  }, []);

  if (!products) {
    return null;
  }

  return (
    <div className="container">
      <div className="addProductContainer">
        <Link href="/product/new">
          <Button>Add Product</Button>
        </Link>
      </div>
      <ActiveFilters
        filterData={props.filterData}
        clearFilters={props.clearFilters}
      />
      <SearchBar
        searchText={props.filterData.searchText}
        searchByText={props.searchByText}
      />
      <SortableTable
        initialSortData={{
          index: 1,
          isAsc: false,
        }}
        headers={getTableHeaders()}
        data={products}
        emptyMsg="No products found for the given query"
        body={renderTableBody}
      />
      <Pagination
        data={props.searchPaginationData}
        onChange={props.setSearchCurrentPageNumber}
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
  products: getSearchResults(state),
  searchPaginationData: getSearchPaginationData(state),
  filterData: getFilterData(state),
});

const mapDispatchToProps: DispatchProps = {
  searchByText: SearchActions.searchByText,
  setSearchCurrentPageNumber: SearchActions.setSearchCurrentPageNumber,
  clearFilters: SearchActions.clearFilters,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Products);
