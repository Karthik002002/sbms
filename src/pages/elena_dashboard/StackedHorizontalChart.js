import FalconComponentCard from 'components/common/FalconComponentCard';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { tooltipFormatter } from 'helpers/echart-utils';
import { getColor } from 'helpers/utils';
import React, { useEffect } from 'react';
import { useState } from 'react';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent
]);

const chartCode = `function ChartOptions() {
  const days = ['school-1', 'school-2', 'school-3', 'school-4', 'school-5'];

  const getOption = () => ({
    color: [
      getColor('green'),
      getColor('info'),
      getColor('danger'),
      getColor('purple'),
      getColor('warning'),
      getColor('primary'),
      getColor('dark'),
      getColor('gray')

    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      padding: [7, 10],
      backgroundColor: getColor('gray-100'),
      borderColor: getColor('gray-300'),
      textStyle: { color: getColor('primary') },
      borderWidth: 1,
      transitionDuration: 0,
      formatter: tooltipFormatter
    },
    toolbox: {
      feature: {
        magicType: {
          type: ['stack', 'tiled']
        }
      },
      right: 0
    },
    legend: {
      data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
      textStyle: {
        color: getColor('gray-600')
      },
      left: 0
    },
    xAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: getColor('gray-300')
        }
      },
      axisTick: { show: false },
      axisLabel: {
        color: getColor('gray-500')
      },
      splitLine: {
        lineStyle: {
          show: true,
          color: getColor('gray-200')
        }
      }
    },
    yAxis: {
      type: 'category',
      data: days,
      axisLine: {
        lineStyle: {
          show: true,
          color: getColor('gray-300')
        }
      },
      axisTick: { show: false },
      axisLabel: {
        color: getColor('gray-500'),
        formatter: value => value.substring(0, 8)
      }
    },
    series: [
      {
        name: ' Running',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          color: '#fff'
        },
        emphasis: {
          focus: 'series'
        },
        data: [200, 150, 299, 334, 390, 330, 320]
      },
      {
        name: 'Idle',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 188, 301, 250, 190, 230, 210]
      },
      {
        name: ' Stopped',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          color: '#fff'
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: ' Towing',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          color: '#fff'
        },
        emphasis: {
          focus: 'series'
        },
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: 'Rash Driving',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series'
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      },
      {
        name: ' Parked',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series'
        },
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: ' Inactive',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series'
        },
        data: [200, 212, 201, 154, 190, 330, 410]
      },
      {
        name: ' No Network',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series'
        },
        data: [500, 212, 201, 154, 190, 330, 410]
      }
    ],
    grid: {
      right: 15,
      left: 5,
      bottom: 5,
      top: '15%',
      containLabel: true
    }
    });
    return (
      <ReactEChartsCore
        echarts={echarts}
        option={getOption()}
        style={{ height: '21.88rem' }}
      />
    );
  }
`;

const StackedHorizontalChart = () => {
  const responseData = JSON.parse(sessionStorage.getItem('dashboardData'));
  const [statusCounts, setStatusCounts] = useState([]);
  const horizontalCharData = [];
  useEffect(() => {
    if (responseData) {
      const horizontalCharData = [];
      responseData.forEach(vehicleCompany => {
        const { vehicleCompany_name, schools } = vehicleCompany;

        schools.forEach(school => {
          const { school_name, vehicles } = school;

          let running = 0;
          let idle = 0;
          let stopped = 0;
          let rashDriving = 0;

          const runningSet = new Set();
          const idleSet = new Set();
          const stoppedSet = new Set();
          const rashDrivingSet = new Set();

          if (vehicles && vehicles.length > 0) {
            vehicles.forEach(vehicle => {
              if (vehicle.ignition && Number(vehicle.speed) > 0) {
                runningSet.add(vehicle.id);
              } else if (vehicle.ignition && Number(vehicle.speed) === 0) {
                idleSet.add(vehicle.id);
              } else if (!vehicle.ignition && Number(vehicle.speed) === 0) {
                stoppedSet.add(vehicle.id);
              } else if (
                (Number (vehicle.speed) > Number(vehicle.limit) ) &&
                vehicle.ignition == '1'
              ) {
                rashDrivingSet.add(vehicle.id);
              }
            });
          }

          running = runningSet.size;
          idle = idleSet.size;
          stopped = stoppedSet.size;
          rashDriving = rashDrivingSet.size;

          horizontalCharData.push({
            company_name: vehicleCompany_name,
            school_name: school_name,
            running: running,
            idle: idle,
            stopped: stopped,
            rashDriving: rashDriving,
          });
        });
      });
      console.log(horizontalCharData); // Verify the data structure

      // Perform any further processing or use of horizontalCharData here
    }
  }, [responseData]);

  console.log(statusCounts);

  return (
    <FalconComponentCard className="h-100">
      <FalconComponentCard.Header
        title="Vehicle wise Utilisation"
        light={false}
      />
      <FalconComponentCard.Body
        code={chartCode}
        language="jsx"
        scope={{
          ReactEChartsCore,
          echarts,
          getColor,
          tooltipFormatter
        }}
      />
    </FalconComponentCard>
  );
};

export default StackedHorizontalChart;
