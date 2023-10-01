import {Card, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {getProduction} from '../../../services/database-service';

ChartJS.register (
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const {RangePicker} = DatePicker;

function DashboardLineChart({selectedMineData}) {
  const [dateRange, setDateRange] = useState ({
    startDate: moment ().subtract (5, 'years'),
    endDate: moment (),
  });

  const [chartData, setChartData] = useState ({
    labels: [],
    datasets: [
      {
        label: 'Yield',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 1)',
        pointBackgroundColor: 'rgba(53, 162, 235, 1)',
      },
    ],
  });

  useEffect (
    () => {
      if (selectedMineData && dateRange.startDate && dateRange.endDate) {
        const mineId = selectedMineData.id;

        // Update this function to fetch production data based on date range
        getProduction (mineId)
          .then (res => {
            if (Array.isArray (res)) {
              const labels = res.map (value => value.year).filter (year => {
                const yearNum = parseInt (year, 10);
                return (
                  yearNum >= dateRange.startDate.year () &&
                  yearNum <= dateRange.endDate.year ()
                );
              });

              const data = res.map (value => value.yield);

              const dataSource = {
                labels,
                datasets: [
                  {
                    label: 'Yield',
                    data,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ],
              };

              setChartData (dataSource);
            } else {
              console.error ('Production data is not an array:', res);
            }
          })
          .catch (error => {
            console.error ('Error fetching production data:', error);
          });
      }
    },
    [selectedMineData, dateRange]
  );

  const handleDateRangeChange = value => {
    // Update the date range state when the DateRangePicker changes
    const res = {
      startDate: moment (new Date (value.startDate[0])),
      endDate: moment (new Date (value.startDate[1])),
    };
    setDateRange (res);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
      },
      title: {
        display: true,
        text: 'Production Yield',
      },
    },
  };

  return (
    <Card style={{width: 500, height: 350}}>
      <div>
        <Typography.Text>Filter By Year: </Typography.Text>
        <RangePicker
          picker="year"
          // value={[dateRange.startDate, dateRange.endDate]}
          onChange={value =>
            handleDateRangeChange ({
              startDate: value,
              endDate: dateRange.endDate,
            })}
        />
      </div>
      <Line options={options} data={chartData} />
    </Card>
  );
}

export default DashboardLineChart;
