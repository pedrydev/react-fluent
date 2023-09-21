import { AreaChart, IAreaChartProps, IChartProps, LineChart } from '@fluentui/react-charting';

const lineChartData: IChartProps = {
  chartTitle: 'Line chart example',
  lineChartData: [
    {
      legend: 'Salary',
      data: [
        {
          x: new Date(2023, 1, 1),
          y: 12000,
        },
        {
          x: new Date(2023, 2, 1),
          y: 7000,
        },
        {
          x: new Date(2023, 3, 1),
          y: 13000,
        },
        {
          x: new Date(2023, 4, 1),
          y: 15500,
        },
        {
          x: new Date(2023, 5, 1),
          y: 20000,
        },
      ],
    },
    {
      legend: 'Consumed',
      data: [
        {
          x: new Date(2023, 1, 1),
          y: 7000,
        },
        {
          x: new Date(2023, 2, 1),
          y: 6500,
        },
        {
          x: new Date(2023, 3, 1),
          y: 8000,
        },
        {
          x: new Date(2023, 4, 1),
          y: 5500,
        },
        {
          x: new Date(2023, 5, 1),
          y: 7000,
        },
      ],
    },
  ],
};

const areaChartData: IAreaChartProps['data'] = {
  chartTitle: 'Area chart example',
  lineChartData: [
    {
      legend: 'Point 1',
      data: [
        { x: 1, y: 45 },
        { x: 2, y: 24 },
        { x: 3, y: 92 },
        { x: 4, y: 74 },
        { x: 5, y: 38 },
        { x: 6, y: 36 },
      ],
    },
    {
      legend: 'Point 2',
      data: [
        { x: 1, y: 74 },
        { x: 2, y: 29 },
        { x: 3, y: 74 },
        { x: 4, y: 38 },
        { x: 5, y: 19 },
        { x: 6, y: 89 },
      ],
    },
  ],
};

export default function Charts() {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='bg-white p-2 shadow-md rounded-md'>
        <LineChart data={lineChartData} />
      </div>
      <div className='bg-white p-2 shadow-md rounded-md'>
        <AreaChart data={areaChartData} />
      </div>
    </div>
  );
}
