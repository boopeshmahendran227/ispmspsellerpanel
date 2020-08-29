import { ResponsiveLine } from "@nivo/line";

export const percentageDifference = (array) => {
  const len = array.length;
  const diff = Math.round(
    ((array[len - 1].y - array[len - 2].y) / array[len - 2].y) * 100
  );
  return diff;
};
export const formatLineData = (data) => {
  const monthWiseRevenueList = data.map((object) => ({
    x: object.month,
    y: object.revenue,
  }));
  return [{ id: "revenue", data: monthWiseRevenueList }];
};
export interface MonthlySalesInterface {
  dateTime: Date;
  month: string;
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
    colors={{ scheme: "set2" }}
    lineWidth={0}
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
    areaOpacity={0.8}
    useMesh={true}
    legends={[
      {
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 10,
        translateY: -40,
        itemsSpacing: 3,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default RevenueLineChart;
