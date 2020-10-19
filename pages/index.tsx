import React, { useState } from "react";
import WithAuth from "components/WithAuth";
import Select from "components/Select";
import { SelectOptionInterface } from "types/product";
import PageHeaderContainer from "components/atoms/PageHeaderContainer";
import PageHeader from "components/PageHeader";
import AnalyticsContainer from "components/AnalyticsContainer";
import QuickLinksContainer from "components/QuickLinksContainer";
import { PeriodState } from "types/insights";

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
    <div className="container">
      <QuickLinksContainer />
      <PageHeaderContainer>
        <PageHeader>Analytic Overview</PageHeader>
        <div className="selectContainer">
          <Select
            value={period}
            options={filter}
            onChange={(value) => setPeriod(value)}
          />
        </div>
      </PageHeaderContainer>
      <AnalyticsContainer period={period.value as PeriodState} />
      <style jsx>{`
        .container {
          margin: 0.3em 1em;
          max-width: 1400px;
          margin: auto;
        }
        .selectContainer {
          min-width: 150px;
        }
      `}</style>
    </div>
  );
};

export default WithAuth(Home);
