//Doughnutchart.js

import FalconComponentCard from 'components/common/FalconComponentCard';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { getColor } from 'helpers/utils';
import VehicleDashboard from 'pages/dashboard/VehicleDashboard';
import React, { useEffect, useState } from 'react';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent
]);

const DoughnutRoundedChart = () => {
  const [data, setData] = useState();
  const [running, setRunning] = useState();
  const [idle, setIdle] = useState();
  const [stopped, setStopped] = useState();
  const [rashDriving, setRashDriving] = useState();
  const [towing, setTowing] = useState();
  const [parked, setParked] = useState();
  const [noNetwork, setNoNetwork] = useState();
  const [inActive, setInActive] = useState();
  const [noNetworkStatus, setNoNetworkStatus] = useState(String(false));
  const [inActiveStatus, setInActiveStatus] = useState(String(false));
  // const [inactive, setInactive] = useState()

  // console.log(sessionStorage.getItem('dashboardData'));
  let dashboardData = JSON.parse(sessionStorage.getItem('dashboardData'));

  useEffect(() => {
    let runningCount = 0;
    let idleCount = 0;
    let stoppedCount = 0;
    let rashDrivingCount = 0;
    let towingCount = 0;
    let parkedCount = 0;
    let noNetworkCount = 0;
    let inActiveCount = 0;

    let latLongArray = [];

    const checkNoNetwork = setInterval(() => {
      latLongArray.forEach(vehicle => {
        const foundVehicle = dashboardData
          .flatMap(company => company.schools)
          .flatMap(school => school.vehicles)
          .find(v => v.id === vehicle.id);

        if (foundVehicle) {
          const { latitude: newLat, longitude: newLong } = foundVehicle;
          if (newLat === vehicle.latitude && newLong === vehicle.longitude) {
            vehicle.noChangeCounter = (vehicle.noChangeCounter || 0) + 1;

            if (vehicle.noChangeCounter === 90) {
              setNoNetworkStatus(String(true));
              return true;
            }
          } else if (vehicle.noChangeCounter >= 360) {
            setInActiveStatus(String(true));
            return true;
          } else {
            vehicle.latitude = newLat;
            vehicle.longitude = newLong;
            vehicle.noChangeCounter = 0;
            console.log('No');
            return false;
          }
        }
      });
    }, 10 * 1000);

    dashboardData.forEach(company => {
      company.schools.forEach(school => {
        school.vehicles.forEach(vehicle => {
          const { id, latitude, longitude } = vehicle;

          latLongArray.push({ id, latitude, longitude });

          console.log(latLongArray);
          if (vehicle.ignition == '1' && Number(vehicle.speed) > 0) {
            runningCount++;
          } else if (vehicle.ignition == '1' && Number(vehicle.speed) == 0) {
            idleCount++;
          } else if (vehicle.ignition !== '1' && Number(vehicle.speed) == 0) {
            stoppedCount++;
          } else if (vehicle.ignition == '1' && Number(vehicle.speed) >= 60) {
            rashDrivingCount++;
          } else if (vehicle.ignition == '0' && Number(vehicle.speed) >= 0) {
            towingCount++;
          } else if (vehicle.location) {
            //parked.Location(from api ) == currentLocation
            parkedCount++;
          } else if (checkNoNetwork() && noNetworkStatus) {
            noNetworkCount++;
          } else if (checkNoNetwork() && inActiveStatus) {
            inActiveCount++;
          }
        });
      });
    });
    console.log('Doughnut Loading');

    // console.log(Running: ${runningCount});
    // console.log(Idle: ${idleCount});
    // console.log(Stopped: ${stoppedCount});

    setRunning(runningCount);
    setIdle(idleCount);
    setStopped(stoppedCount);
    setRashDriving(rashDrivingCount);
    setTowing(towingCount);
    setParked(parkedCount);
    setNoNetwork(noNetworkCount);
    setInActive(inActiveCount);
    // setInactive(inactiveCount)
  });
  const chartCode = `function ChartOptions() {
    const chartRef = useRef(null)
    const isMobile = window.innerWidth < 992;
    const getOption = () => ({
      
      legend: {
        orient: window.innerWidth < 530 ? 'horizontal' : 'horizontal', // Change the legend orientation
        left: 'left',
      },
      series: [
        {
          type: 'pie',
          margin: 40,
          radius: ['40%', '70%'],
          center: window.innerWidth < 1030  ? ['50%', '40%'] : window.innerWidth < 780  ? ['50%', '65%'] : window.innerWidth < 580  ? ['50%', '65%'] : window.innerWidth < 430 ? ['50%', '58%'] : window.innerWidth < 330 ? ['60%','55%']: ['50%','60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: getColor('gray-100'),
            borderWidth: 2
          },
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: [
            {
              value: ${running},
              name: 'Running',
              itemStyle: {
                color: getColor('green')
              }
            },
            {
              value: ${idle},
              name: 'Idle',
              itemStyle: {
                color: getColor('info')
              }
            },
            {
              value: ${stopped},
              name: 'Stopped',
              itemStyle: {
                color: getColor('danger')
              }
            },
            {
              value: ${rashDriving},
              name: 'RashDriving',
              itemStyle: {
                color: getColor('warning')
              }
            },
            {
              value: ${towing},
              name: 'Towing',
              itemStyle: {
                color: getColor('purple')
              }
            },
            {
              value: ${parked},
              name: 'Parked',
              itemStyle: {
                color: getColor('primary')
              }
            },
            {
                value: ${noNetwork},
                name: 'No Network',
                itemStyle: {
                  color: getColor('gray')
                }
              },
            {
              value:${inActive},
              name: 'Inactive',
              itemStyle: {
                color: getColor('dark')
              }
            },
            
          ]
        },
        
      ],
      tooltip: {
        trigger: 'item',
        padding: [5, 5],
        backgroundColor: getColor('gray-100'),
        borderColor: getColor('gray-300'),
        textStyle: { color: getColor('dark') },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        },
      }
      });
  
      //------- Responsive on window resize -------
      
      // const updateDimensions = () => {
      //   if (window.innerWidth < 530) {
      //     chartRef.current.getEchartsInstance().setOption({
      //       series: [
      //         {
      //           center: ['65%', '55%']
      //         }
      //       ]
      //     });
      //   } 
      //   else
      //     chartRef.current.getEchartsInstance().setOption({
      //       series: [
      //         {
      //           center: ['50%', '55%']
      //         }
      //       ]
      //     });
      // }
    
      // useEffect(() => {
      //   window.addEventListener('resize', updateDimensions);
      //   return () => window.removeEventListener('resize', updateDimensions);
      // }, []);
  
      return (
        <ReactEChartsCore
          echarts={echarts}
          option={getOption()}
          ref={chartRef}
          style={{ height: '25rem' }}
        />
      );
    }
  `;

  return (
    <FalconComponentCard dir="ltr" className="h-100">
      <FalconComponentCard.Header title="Total Vehicle Status" light={false} />
      <FalconComponentCard.Body
        code={chartCode}
        language="jsx"
        scope={{
          ReactEChartsCore,
          echarts,
          getColor
        }}
      />
    </FalconComponentCard>
  );
};

export default DoughnutRoundedChart;
