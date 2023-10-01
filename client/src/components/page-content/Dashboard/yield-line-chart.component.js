import React, {useEffect, useState} from 'react';
import {Card, Typography} from 'antd';
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

// Register ChartJS components and plugins
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

// Functional component for displaying a line chart of production yield
function DashboardLineChart({selectedMineData}) {
  // State to manage the date range for filtering production data
  const [dateRange, setDateRange] = useState ({
    startDate: moment ().subtract (5, 'years'),
    endDate: moment (),
  });

  // State to manage chart data for displaying production yield
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
      const fetchData = async () => {
        if (selectedMineData && dateRange.startDate && dateRange.endDate) {
          const mineId = selectedMineData.id;
          try {
            const productionData = await getProduction (mineId);
            if (Array.isArray (productionData)) {
              const labels = productionData
                .map (value => value.year)
                .filter (year => {
                  const yearNum = parseInt (year, 10);
                  return (
                    yearNum >= dateRange.startDate.year () &&
                    yearNum <= dateRange.endDate.year ()
                  );
                });

              const uniqueMaterials = [
                ...new Set (productionData.map (item => item.material)),
              ];

              const datasets = uniqueMaterials.map (material => {
                const randomColor = `rgb(${Math.floor (Math.random () * 256)}, ${Math.floor (Math.random () * 256)}, ${Math.floor (Math.random () * 256)})`;
                const dataForMaterial = productionData
                  .filter (item => item.material === material)
                  .map (item => parseInt (item.yield, 10));
                return {
                  label: material,
                  data: dataForMaterial,
                  borderColor: randomColor,
                  backgroundColor: randomColor,
                };
              });

              const dataSource = {
                labels: labels,
                datasets: datasets,
              };

              setChartData (dataSource);
            } else {
              console.error (
                'Production data is not an array:',
                productionData
              );
            }
          } catch (error) {
            console.error ('Error fetching production data:', error);
          }
        }
      };

      fetchData ();
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

  // Chart options for appearance and behavior
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
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
        {/* DateRangePicker for filtering by year */}
        <RangePicker
          picker="year"
          onChange={value =>
            handleDateRangeChange ({
              startDate: value,
              endDate: dateRange.endDate,
            })}
        />
      </div>
      {/* Display the line chart */}
      <Line options={options} data={chartData} />
    </Card>
  );
}

export default DashboardLineChart;
