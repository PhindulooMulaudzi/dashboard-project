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

// Functional component for selecting a mine
function SelectedMineFilter({selectedMine, handleMineChange, mines}) {
  return (
    <div>
      <Typography.Text>Selected mine: </Typography.Text>
      {/* Select component to choose a mine */}
      <Select
        placeholder="Select Mine"
        style={{width: 200}}
        value={selectedMine} // Value of the selected mine
        onChange={handleMineChange} // Handler for selecting a mine
      >
        {/* Generate options for each mine */}
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
