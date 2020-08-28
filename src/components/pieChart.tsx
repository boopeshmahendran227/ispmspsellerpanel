import { ResponsivePie } from "@nivo/pie";
import { isOpenOrderStatus } from "../../src/utils/order";
import { isDeliveredOrderStatus } from "../../src/utils/order";
import { isReturnedOrderStatus } from "../../src/utils/order";
import { isCancelledOrderStatus } from "../../src/utils/order";
import { isShippingOrderStatus } from "../../src/utils/order";
import { isPendingOrderStatus } from "../../src/utils/order";
import { isCompletedOrderStatus } from "../../src/utils/order";
import { SummaryInterface } from "../types/insights";
import { OrderStatus } from "../types/order";
import _ from "lodash";

const formatPieData = (data: Record<OrderStatus, number>) => {
  const finalOrderCount = (map, filterfn) => {
    return _.chain(map)
      .entries(map)
      .filter(([key, value]) => filterfn(key))
      .map(([key, value]) => value)
      .sum()
      .value();
  };
  const openOrders = finalOrderCount(data, isOpenOrderStatus);
  const completedOrders = finalOrderCount(data, isCompletedOrderStatus);
  const pendingOrders = finalOrderCount(data, isPendingOrderStatus);
  const cancelledOrders = finalOrderCount(data, isCancelledOrderStatus);
  const returnedOrders = finalOrderCount(data, isReturnedOrderStatus);
  const deliveredOrders = finalOrderCount(data, isDeliveredOrderStatus);
  const shippingOrders = finalOrderCount(data, isShippingOrderStatus);

  return [
    {
      id: "Open orders",
      label: "Open Orders",
      value: openOrders,
    },

    {
      id: "Completed Orders",
      label: "Completed Orders",
      value: completedOrders,
    },
    {
      id: "Pending Orders",
      label: "Pending Orders",
      value: pendingOrders,
    },
    {
      id: "Returned Orders",
      label: "Returned Orders",
      value: returnedOrders,
    },
    {
      id: "Cancelled Orders",
      label: "Cancelled Orders",
      value: cancelledOrders,
    },
    {
      id: "Delivered Orders",
      label: "Delivered Orders",
      value: deliveredOrders,
    },
    {
      id: "Shipping Orders",
      label: "Shipping Orders",
      value: shippingOrders,
    },
  ];
};
interface pieChartProps {
  data: SummaryInterface;
}
const MyResponsivePie = (props: pieChartProps) => (
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
export default MyResponsivePie;
