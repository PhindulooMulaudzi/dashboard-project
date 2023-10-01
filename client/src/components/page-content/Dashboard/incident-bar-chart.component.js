import React, {useEffect, useState} from 'react';
import {Card} from 'antd';
import {Bar} from 'react-chartjs-2';
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

import {getIncidentsCount} from '../../../services/database-service';

// Register Chart.js components
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

// Functional component for displaying a bar chart of incidents in the dashboard
function DashboardIncidentsBarChart({selectedMineData}) {
  // State to hold the chart data
  const [chartData, setChartData] = useState ({
    labels: [],
    datasets: [
      {
        label: 'Incidents',
        data: [],
        backgroundColor: 'rgba(255, 0, 0, 1)',
      },
    ],
  });

  useEffect (
    () => {
      if (selectedMineData) {
        const mineId = selectedMineData.id;

        // Fetch incident count data for the selected mine
        getIncidentsCount (mineId)
          .then (res => {
            if (Array.isArray (res)) {
              // Extract labels and data for the chart
              const labels = res.map (value => value.description);
              const data = res.map (value => value.occurrence_count);

              const dataSource = {
                labels,
                datasets: [
                  {
                    label: 'Incidents',
                    data,
                    backgroundColor: 'rgba(255, 0, 0, 1)',
                  },
                ],
              };

              setChartData (dataSource); // Update chart data
            } else {
              console.error ('Production data is not an array:', res);
            }
          })
          .catch (error => {
            console.error ('Error fetching production data:', error);
          });
      }
    },
    [selectedMineData]
  );

  // Chart options for customization
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Safety Incidents',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card style={{width: 500, height: 350}}>
      {/* Display the bar chart */}
      <Bar options={options} data={chartData} />
    </Card>
  );
}

export default DashboardIncidentsBarChart;
