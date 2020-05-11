import TestDriveCard from "../../src/components/TestDriveCard";
import { TestDriveInterface } from "../../src/types/testdrive";
import Loader from "../../src/components/Loader";
import Error from "next/error";
import useSWR from "swr";

const Testdrives = () => {
  const swr = useSWR("/testdrive");
  const testdrives: TestDriveInterface[] = swr.data;
  const error = swr.error;

  if (error) {
    return <Error title="Unexpected error occured" statusCode={500} />;
  }
  if (!testdrives) {
    return <Loader />;
  }

  return (
    <div className="container">
      <header>Test Drives ({testdrives.length})</header>
      <div className="body">
        {testdrives.map((testdrive) => (
          <TestDriveCard testdrive={testdrive} />
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
        header {
          font-weight: 500;
          font-size: 1.2rem;
          padding: 0.5em;
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
