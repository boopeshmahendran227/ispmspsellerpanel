import React, { useState } from "react";
import WithAuth from "components/atoms/WithAuth";
import Select from "components/atoms/Select";
import { SelectOptionInterface } from "types/product";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageHeader from "components/atoms/PageHeader";
import AnalyticsContainer from "components/organism/AnalyticsContainer";
import { PeriodState } from "types/insights";
import { Box } from "@chakra-ui/core";

const filter: SelectOptionInterface[] = [
  {
    value: PeriodState.week,
    label: "This week",
  },
  {
    value: PeriodState.lastMonth,
    label: "This month",
  },
  {
    value: PeriodState.last3Months,
    label: "Last 3 months",
  },
];

const Home = (): JSX.Element => {
  const [period, setPeriod] = useState(filter[0]);

  return (
    <Box my={2} mx={3} maxW="1400px" m="auto" className="container">
      <PageHeaderContainer>
        <PageHeader>Analytic Overview</PageHeader>
        <Box maxW="150px" w="100%" className="selectContainer">
          <Select
            value={period}
            options={filter}
            onChange={(value) => setPeriod(value)}
          />
        </Box>
      </PageHeaderContainer>
      <AnalyticsContainer period={period.value as PeriodState} />
    </Box>
  );
};

export default WithAuth(Home);
