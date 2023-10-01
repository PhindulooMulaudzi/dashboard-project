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

function DashboardCard({icon, title, value}) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Space direction="vertical">
          <Typography.Text>{title}</Typography.Text>
          <Typography.Text>{value}</Typography.Text>
        </Space>
      </Space>
    </Card>
  );
}

export default DashboardCard;
