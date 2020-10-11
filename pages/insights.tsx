import MetricCard from "components/atoms/MetricCard";
import useSWR from "swr";
import Loader from "components/atoms/Loader";
import PageError from "components/atoms/PageError";
import { EcosystemResponseInterface } from "types/business";
import WithAuth from "components/atoms/WithAuth";
import moment from "moment";
import { SummaryInterface } from "types/insights";
import { formatPrice } from "utils/misc";
import RoundedIcon from "components/atoms/RoundedIcon";
import CSSConstants from "../src/constants/CSSConstants";
import { Box, Heading, Stack } from "@chakra-ui/core";

const startDate = moment().subtract(7, "days").startOf("day");
const endDate = moment().endOf("day");
const Insight = () => {
  const summarySWR = useSWR(
    `/reports/seller/summary?start=${startDate
      .utc()
      .format()}&end=${endDate.utc().format()}`
  );
  const businessSWR = useSWR("/businesses/ecosystems/all");
  const summary: SummaryInterface = summarySWR.data;
  const ecosystemData: EcosystemResponseInterface = businessSWR.data;

  const error = summarySWR.error || businessSWR.error;

  if (error) {
    return <PageError statusCode={error.response?.status} />;
  }

  if (!summary || !ecosystemData) {
    return <Loader />;
  }

  return (
    <Box mx={2} my={4} className="container">
      <Heading size="md">Stats for Last 7 Days</Heading>
      <Stack spacing={3}>
        <Box>
          <MetricCard
            title="Orders"
            icon={
              <RoundedIcon
                icon={
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                }
                color={CSSConstants.secondaryColor}
              />
            }
            value={summary.totalOrderCount}
          />
        </Box>
        <Box>
          <MetricCard
            title="Customers"
            icon={
              <RoundedIcon
                icon={<i className="fas fa-users"></i>}
                color={CSSConstants.dangerColor}
              />
            }
            value={summary.totalCustomers}
          />
        </Box>
        <Box>
          <MetricCard
            title="Quotes"
            icon={
              <RoundedIcon
                icon={<i className="fas fa-comments-dollar"></i>}
                color={CSSConstants.warningColor}
              />
            }
            value={summary.totalQuotes}
          />
        </Box>
        <Box>
          <MetricCard
            title="Revenue"
            icon={
              <RoundedIcon
                icon={<i className="fas fa-money-bill"></i>}
                color={CSSConstants.successColor}
              />
            }
            value={formatPrice(summary.totalRevenue)}
          />
        </Box>
        <Box>
          <MetricCard
            title="Ecosystems"
            icon={
              <RoundedIcon
                icon={<i className="fas fa-store"></i>}
                color={CSSConstants.primaryColor}
              />
            }
            value={ecosystemData.length}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default WithAuth(Insight);
