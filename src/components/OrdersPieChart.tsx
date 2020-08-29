import { ResponsivePie } from "@nivo/pie";
import { isOpenOrderStatus } from "../utils/order";
import { isDeliveredOrderStatus } from "../utils/order";
import { isReturnedOrderStatus } from "../utils/order";
import { isCancelledOrderStatus } from "../utils/order";
import { isShippingOrderStatus } from "../utils/order";
import { isPendingOrderStatus } from "../utils/order";
import { isCompletedOrderStatus } from "../utils/order";
import { SummaryInterface } from "../types/insights";
import { OrderStatus } from "../types/order";
import _ from "lodash";

const formatPieData = (data: Record<OrderStatus, number>) => {
  const findOrderCount = (map, filterFn) => {
    return _.chain(map)
      .entries()
      .filter(([key, value]) => filterFn(key))
      .map(([key, value]) => value)
      .sum()
      .value();
  };
  const openOrderCount = findOrderCount(data, isOpenOrderStatus);
  const completedOrderCount = findOrderCount(data, isCompletedOrderStatus);
  const pendingOrderCount = findOrderCount(data, isPendingOrderStatus);
  const cancelledOrderCount = findOrderCount(data, isCancelledOrderStatus);
  const returnedOrderCount = findOrderCount(data, isReturnedOrderStatus);
  const deliveredOrderCount = findOrderCount(data, isDeliveredOrderStatus);
  const shippingOrderCount = findOrderCount(data, isShippingOrderStatus);

  return [
    {
      id: "Open orders",
      label: "Open Orders",
      value: openOrderCount,
    },

    {
      id: "Completed Orders",
      label: "Completed Orders",
      value: completedOrderCount,
    },
    {
      id: "Pending Orders",
      label: "Pending Orders",
      value: pendingOrderCount,
    },
    {
      id: "Returned Orders",
      label: "Returned Orders",
      value: returnedOrderCount,
    },
    {
      id: "Cancelled Orders",
      label: "Cancelled Orders",
      value: cancelledOrderCount,
    },
    {
      id: "Delivered Orders",
      label: "Delivered Orders",
      value: deliveredOrderCount,
    },
    {
      id: "Shipping Orders",
      label: "Shipping Orders",
      value: shippingOrderCount,
    },
  ];
};
interface PieChartProps {
  data: SummaryInterface;
}
const OrderCountPieChart = (props: PieChartProps) => (
  <ResponsivePie
    data={formatPieData(props.data.orderCount)}
    margin={{ top: 40, right: 80, bottom: 80, left: 90 }}
    innerRadius={0.7}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: "set2" }}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: "color" }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    legends={[
      {
        anchor: "top-right",
        direction: "column",
        translateY: 110,
        translateX: 70,
        itemWidth: 120,
        itemHeight: 20,
        itemTextColor: "#999",
        symbolSize: 15,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);
export default OrderCountPieChart;
