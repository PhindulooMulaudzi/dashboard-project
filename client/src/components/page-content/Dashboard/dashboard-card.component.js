import React from 'react';
import {Card, Space, Typography} from 'antd';
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

// Functional component for displaying a card in the dashboard
function DashboardCard({icon, title, value}) {
  return (
    <Card>
      <Space direction="horizontal">
        {/* Display the icon */}
        {icon}
        <Space direction="vertical">
          <Typography.Text>{title}</Typography.Text> {/* Display the title */}
          <Typography.Text>{value}</Typography.Text> {/* Display the value */}
        </Space>
      </Space>
    </Card>
  );
}

export default DashboardCard;
