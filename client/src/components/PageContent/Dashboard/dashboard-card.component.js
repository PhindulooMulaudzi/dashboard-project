import React from 'react';
import {Card, Space, Statistic} from 'antd';
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

const statisticStyle = {
  marginTop: '16px', // Adjust the top margin
  fontSize: '300px', // Adjust the font size
};

function DashboardCard({icon, title, value}) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} style={statisticStyle} />
      </Space>
    </Card>
  );
}

export default DashboardCard;
