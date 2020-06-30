import TestDriveCard from "../../src/components/TestDriveCard";
import { TestDriveInterface } from "../../src/types/testdrive";
import Loader from "../../src/components/Loader";
import useSWR from "swr";
import PageError from "../../src/components/PageError";
import PageHeader from "../../src/components/PageHeader";
import moment from "moment";
import _ from "lodash";

const Testdrives = () => {
  const swr = useSWR("/testdrive");
  const testdrives: TestDriveInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }
  if (!testdrives) {
    return <Loader />;
  }

  // sort in reverse chronological order
  const sortedTestdrives: TestDriveInterface[] = _.sortBy(
    testdrives,
    (testdrive: TestDriveInterface) => moment(testdrive.requestedDate)
  ).reverse();

  return (
    <div className="container">
      <PageHeader>Test Drives ({testdrives.length})</PageHeader>
      <div className="body">
        {sortedTestdrives.map((testdrive, index) => (
          <TestDriveCard key={index} testdrive={testdrive} />
        ))}
      </div>
      <style jsx>{`
        .container {
          padding: 1em;
          margin: 1em;
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
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

export default Testdrives;
