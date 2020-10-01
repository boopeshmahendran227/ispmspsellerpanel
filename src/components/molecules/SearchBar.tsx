import CSSConstants from "../../constants/CSSConstants";
import _ from "lodash";
import { ChangeEvent } from "react";

interface SearchBarProps {
  searchText: string;
  searchByText: (text: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    props.searchByText(value);
  };

  const handleCloseBtnClick = () => {
    props.searchByText("");
  };

  return (
    <div className="container">
      <input
        name="search"
        autoComplete="off" // desperately tring to turn off autocompletion
        placeholder="Search for products"
        onChange={handleInputChange}
        value={props.searchText}
      />
      {Boolean(props.searchText) && (
        <button
          type="button"
          className="closeBtn"
          onClick={handleCloseBtnClick}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      )}
      <div className="searchButtonContainer">
        <button type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <style jsx>{`
        .container {
          width: 300px;
          display: inline-flex;
          border-radius: 0.5em;
          overflow: hidden;
          background: #fff;
          border: 1px solid #f5f5f6;
          transition: all 0.3s;
          font-size: 14px;
          box-shadow: 0 0 2px ${CSSConstants.outlineColor};
        }
        .searchButtonContainer button {
          color: #a6a6b3;
          display: inline-block;
          font-size: 17px;
          height: 100%;
          border: none;
          background: none;
          padding: 7px 14px;
        }
        input {
          font-size: inherit;
          margin: 0;
          width: 100%;
          color: #696e79;
          background: none;
          border: none;
          outline: none;
          box-shadow: none;
        }
        input:focus {
          border: none;
        }
        .closeBtn {
          background: none;
          font-size: 16px;
          color: ${CSSConstants.borderColor};
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
