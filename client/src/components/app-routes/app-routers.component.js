import {Route, Routes} from 'react-router-dom';

import Dashboard from '../../pages/dashboard/dashboard-page';
import Inventory from '../../pages/map/map-page';

function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  );
}
export default AppRoutes;
