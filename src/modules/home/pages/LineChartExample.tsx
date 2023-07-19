import { IChartProps, LineChart } from "@fluentui/react-charting";

const chartData: IChartProps = {
  chartTitle: "Line chart example",
  lineChartData: [
    {
      legend: "Salary",
      data: [
        {
          x: new Date(2023, 1, 1),
          y: 12000
        },
        {
          x: new Date(2023, 2, 1),
          y: 7000
        },
        {
          x: new Date(2023, 3, 1),
          y: 13000
        },
        {
          x: new Date(2023, 4, 1),
          y: 15500
        },
        {
          x: new Date(2023, 5, 1),
          y: 20000
        }
      ]
    },
    {
      legend: "Consumed",
      data: [
        {
          x: new Date(2023, 1, 1),
          y: 7000
        },
        {
          x: new Date(2023, 2, 1),
          y: 6500
        },
        {
          x: new Date(2023, 3, 1),
          y: 8000
        },
        {
          x: new Date(2023, 4, 1),
          y: 5500
        },
        {
          x: new Date(2023, 5, 1),
          y: 7000
        }
      ]
    }
  ]
};

export default function LineChartExample() {
  return (
    <div>
      <LineChart data={chartData} />
    </div>
  );
}
