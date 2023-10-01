import React from 'react';
import {Select, Typography} from 'antd';
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

function SelectedMineFilter({selectedMine, handleMineChange, mines}) {
  return (
    <div>
      <Typography.Text>Selected mine: </Typography.Text>
      <Select
        placeholder="Select Mine"
        style={{width: 200}}
        value={selectedMine}
        onChange={handleMineChange}
      >
        {mines.map ((mine, index) => (
          <Select.Option key={index} value={mine.name}>
            {mine.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectedMineFilter;
