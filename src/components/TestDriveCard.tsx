import { TestDriveInterface } from "../types/testdrive";
import RelativeImg from "./RelativeImg";
import moment from "moment";

interface TestDriveCardProps {
  testdrive: TestDriveInterface;
}

const TestDriveCard = (props: TestDriveCardProps) => {
  const { testdrive } = props;
  return (
    <div className="container">
      <div className="imageContainer">
        <RelativeImg src={testdrive.images[0]} />
      </div>
      <div className="contentContainer">
        <div className="customerContainer">
          <i className="fas fa-user"></i>
          <span className="customerName">Customer #{testdrive.customerId}</span>
        </div>{" "}
        <div className="productContainer">
          <i className="fa fa-motorcycle" aria-hidden="true"></i>
          Test drive requested for{" "}
          <span className="productName">
            {testdrive.productName} ({"#" + testdrive.productId})
          </span>{" "}
          on{" "}
          <span className="date">
            {moment(testdrive.requestedDate).format("MMM D, YYYY")}
          </span>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          margin: 1em 0;
        }
        .contentContainer {
          padding: 0.4em;
        }
        .imageContainer {
          width: 100px;
          height: 100px;
          margin-right: 0.5em;
        }
        i {
          margin: 0.3em;
        }
        .customerContainer,
        .productContainer {
          margin: 0.3em 0;
        }
        .customerName,
        .productName,
        .date {
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default TestDriveCard;
