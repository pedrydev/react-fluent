import { AreaChart, IAreaChartProps } from "@fluentui/react-charting";

const data: IAreaChartProps["data"] = {
  chartTitle: "Area chart example",
  lineChartData: [
    {
      legend: "Point 1",
      data: [
        { x: 1, y: 45 },
        { x: 2, y: 24 },
        { x: 3, y: 92 },
        { x: 4, y: 74 },
        { x: 5, y: 38 },
        { x: 6, y: 36 }
      ]
    },
    {
      legend: "Point 2",
      data: [
        { x: 1, y: 74 },
        { x: 2, y: 29 },
        { x: 3, y: 74 },
        { x: 4, y: 38 },
        { x: 5, y: 19 },
        { x: 6, y: 89 }
      ]
    }
  ]
};

export default function AreaChartExample() {
  return (
    <AreaChart data={data} />
  );
}
