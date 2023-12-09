/* eslint-disable react/prop-types */
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import { useEffect } from 'react';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { getColor } from 'helpers/utils';
import { map } from 'leaflet';
import React, { useState } from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent
]);

const SessionByBrowserChart = ({ chartdata }) => {
  const [centerText, setCenterText] = useState(0);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('dashboardData'));
    let totalCount = 0;
    data.forEach(vehicleCompany => {
      vehicleCompany.schools.forEach(school => {
        totalCount += school.vehicles.length;
      });
    });
    setCenterText(totalCount);
  }, [centerText]);

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={{
        color: [
          getColor('primary'),
          getColor('success'),
          getColor('info'),
          getColor('secondary'),
          getColor('warning')
        ],
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('gray-100'),
          borderColor: getColor('gray-300'),
          textStyle: { color: getColor('dark') },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: params =>
            `<strong>${params.data.name}:</strong> ${params.data.value}`
        },
        legend: { show: false },
        series: [
          {
            type: 'pie',
            radius: ['100%', '65%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderWidth: 2,
              borderColor: getColor('gray-100')
            },
            label: {
              show: false
            },
            emphasis: {
              scale: false
            },
            data: chartdata
          },
          {
            type: 'pie',
            radius: ['0%', '10%'],
            center: window.innerWidth < 580 ? ['50%', '58%'] : ['50%', '50%'],
            itemStyle: {
              color: 'transparent',
              borderColor: 'transparent'
            },
            label: {
              show: true,
              position: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              formatter: '{a|' + centerText + '}', // Adjust the formatter to display the centerText value
              rich: {
                a: {
                  fontSize: 30,
                  fontWeight: 'bold',
                  lineHeight: 10
                }
              }
            },
            data: [{ value: centerText }],
            tooltip: { show: true,
             }
          }
        ]
      }}
      style={{ height: 300 }}
    />
  );
};

SessionByBrowserChart.propTypes = {
  // chartdata: propTypes.array
};

export default SessionByBrowserChart;
