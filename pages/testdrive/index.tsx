import TestDriveCard from "components/molecules/TestDriveCard";
import { TestDriveInterface } from "types/testdrive";
import Loader from "components/atoms/Loader";
import useSWR from "swr";
import PageError from "components/atoms/PageError";
import PageHeader from "components/atoms/PageHeader";
import _ from "lodash";
import WithAuth from "components/atoms/WithAuth";
import PageContainer from "components/atoms/PageContainer";
import PageBodyContainer from "components/atoms/PageBodyContainer";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import { Box } from "@chakra-ui/core";

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
        <Box>
          {testdrives.map((testdrive, index) => (
            <TestDriveCard key={index} testdrive={testdrive} />
          ))}
        </Box>
      </PageBodyContainer>
    </PageContainer>
  );
};

export default WithAuth(Testdrives);
