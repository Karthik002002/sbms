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

const StackedHorizontalChartSample = () => {
  const responseData = JSON.parse(sessionStorage.getItem('dashboardData'));
  const [statusCounts, setStatusCounts] = useState([]);
  const horizontalChartData = [];

  useEffect(() => {
    if (responseData) {
      const updatedStatusCounts = [];
      responseData.forEach(vehicleCompany => {
        const { vehicleCompany_name, schools } = vehicleCompany;

        schools.forEach(school => {
          const { school_name,school_code, vehicles } = school;

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
                Number(vehicle.speed) > Number(vehicle.limit) &&
                vehicle.ignition === '1'
              ) {
                rashDrivingSet.add(vehicle.id);
              }
            });
          }

          running = runningSet.size;
          idle = idleSet.size;
          stopped = stoppedSet.size;
          rashDriving = rashDrivingSet.size;

          updatedStatusCounts.push({
            company_name: vehicleCompany_name,
            school_code: school_code,
            running: running,
            idle: idle,
            stopped: stopped,
            rashDriving: rashDriving,
          });
        });
      });

      setStatusCounts(updatedStatusCounts);
    }
  }, []);

  const getOption = () => {
    const days = statusCounts.map(dataItem => dataItem.school_code);

    const seriesData = [
      {
        name: 'Running',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          color: '#fff',
        },
        emphasis: {
          focus: 'series',
        },
        data: statusCounts.map(dataItem => dataItem.running),
      },
      {
        name: 'Idle',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: statusCounts.map(dataItem => dataItem.idle),
      },
      {
        name: 'Stopped',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          color: '#fff',
        },
        emphasis: {
          focus: 'series',
        },
        data: statusCounts.map(dataItem => dataItem.stopped),
      },
      {
        name: 'Rash Driving',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: statusCounts.map(dataItem => dataItem.rashDriving),
      },
    ];

    return {
      color: [
        getColor('green'),
        getColor('info'),
        getColor('danger'),
        getColor('warning'),
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
      // Other chart options...
      xAxis: {
        type: 'value',
        // Other xAxis configurations...
      },
      yAxis: {
        type: 'category',
        data: days,
        // Other yAxis configurations...
      },
      series: seriesData,
      // Other series configurations...
    };
  };

  return (
    <FalconComponentCard className="h-75 scrollable">
      <FalconComponentCard.Header
        title="Vehicle wise Utilisation"
        light={false}
      />
      <FalconComponentCard.Body>
        {statusCounts && statusCounts.length > 0 ? (
          <ReactEChartsCore
            echarts={echarts}
            option={getOption()}
            style={{ height: '21.88rem' }}
          />
        ) : (
          <div>No data available</div>
        )}
      </FalconComponentCard.Body>
    </FalconComponentCard>
  );
};

export default StackedHorizontalChartSample;
