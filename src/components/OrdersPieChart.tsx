import { ResponsivePie } from "@nivo/pie";
import { isDeliveredOrderStatus } from "../utils/order";
import { isReturnedOrderStatus } from "../utils/order";
import { isCancelledOrderStatus } from "../utils/order";
import { isShippingOrderStatus } from "../utils/order";
import { isPendingOrderStatus } from "../utils/order";
import CSSConstants from "../constants/CSSConstants";
import { SummaryInterface } from "../types/insights";
import { OrderStatus } from "../types/order";
import _ from "lodash";
import Chroma from "chroma-js";

const formatPieData = (data: Record<OrderStatus, number>) => {
  const findOrderCount = (map, filterFn) => {
    return _.chain(map)
      .entries()
      .filter(([key]) => filterFn(key))
      .map(([key, value]) => value)
      .sum()
      .value();
  };

  const pendingOrderCount = findOrderCount(data, isPendingOrderStatus);
  const cancelledOrderCount = findOrderCount(data, isCancelledOrderStatus);
  const returnedOrderCount = findOrderCount(data, isReturnedOrderStatus);
  const deliveredOrderCount = findOrderCount(data, isDeliveredOrderStatus);
  const shippingOrderCount = findOrderCount(data, isShippingOrderStatus);

  return [
    {
      id: "Pending Orders",
      label: "Pending Orders",
      value: pendingOrderCount,
    },
    {
      id: "Shipping Orders",
      label: "Shipping Orders",
      value: shippingOrderCount,
    },
    {
      id: "Delivered Orders",
      label: "Delivered Orders",
      value: deliveredOrderCount,
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
  ].filter((item) => item.value > 0);
};
interface PieChartProps {
  data: SummaryInterface;
}

const OrderCountPieChart = (props: PieChartProps) => {
  return (
    <ResponsivePie
      data={formatPieData(props.data.orderCount)}
      margin={{ top: 40, right: 80, bottom: 80, left: 90 }}
      padAngle={0.5}
      colors={[
        CSSConstants.secondaryColor,
        CSSConstants.warningColor,
        CSSConstants.successColor,
        CSSConstants.dangerColor,
        CSSConstants.primaryColor,
      ].map((color) => Chroma(color).alpha(0.8))}
      theme={{
        labels: { text: { fontSize: "17px" } },
      }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      animate={true}
      innerRadius={0.5}
      radialLabelsTextColor={CSSConstants.secondaryTextColor}
      radialLabelsLinkColor={CSSConstants.borderColor}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateY: 50,
          translateX: 70,
          itemWidth: 120,
          itemHeight: 20,
          itemTextColor: CSSConstants.primaryTextColor,
          symbolSize: 15,
          symbolShape: "circle",
        },
      ]}
    />
  );
};
export default OrderCountPieChart;
