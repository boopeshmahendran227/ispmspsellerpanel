import TestDriveCard from "components/TestDriveCard";
import { TestDriveInterface } from "types/testdrive";
import Loader from "components/Loader";
import useSWR from "swr";
import PageError from "components/PageError";
import PageHeader from "components/PageHeader";
import _ from "lodash";
import WithAuth from "components/WithAuth";
import PageContainer from "components/atoms/PageContainer";
import PageBodyContainer from "components/atoms/PageBodyContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";

const Testdrives = () => {
  const swr = useSWR<TestDriveInterface[]>("/testdrive");
  const testdrives: TestDriveInterface[] | undefined = swr.data;
  const error = swr.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!testdrives) {
    return <Loader />;
  }

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeader>Test Drives ({testdrives.length})</PageHeader>
      </PageHeaderContainer>
      <PageBodyContainer>
        <div className="body">
          {testdrives.map((testdrive, index) => (
            <TestDriveCard key={index} testdrive={testdrive} />
          ))}
        </div>
      </PageBodyContainer>
    </PageContainer>
  );
};

export default WithAuth(Testdrives);
