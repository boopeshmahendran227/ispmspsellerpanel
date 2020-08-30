import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import CSSConstants from "../constants/CSSConstants";

const formatLineData = (data) => {
  const monthWiseRevenueList = data.map((object) => ({
    x: moment(object.dateTime).format("MMM"),
    y: object.revenue,
  }));
  return [{ id: "revenue", data: monthWiseRevenueList }];
};

export interface MonthlySalesInterface {
  dateTime: Date;
  revenue: number;
}

interface RevenueDataProps {
  revenueData: MonthlySalesInterface[];
  interval: number;
}

const RevenueLineChart = (props: RevenueDataProps) => (
  <ResponsiveLine
    data={formatLineData(props.revenueData)}
    margin={{ top: 50, right: 70, bottom: 50, left: 90 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: 0,
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    curve="monotoneX"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 2,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Period",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      tickValues: [
        props.interval,
        2 * props.interval,
        3 * props.interval,
        4 * props.interval,
        5 * props.interval,
        6 * props.interval,
        7 * props.interval,
        8 * props.interval,
        9 * props.interval,
      ],
      legend: "Revenue",
      legendOffset: -70,
      legendPosition: "middle",
    }}
    colors={[CSSConstants.secondaryColor]}
    enableGridX={false}
    enableGridY={false}
    enablePoints={false}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="y"
    pointLabelYOffset={-15}
    enableArea={true}
    areaBaselineValue={0}
    areaOpacity={0.3}
    useMesh={true}
  />
);

export default RevenueLineChart;
