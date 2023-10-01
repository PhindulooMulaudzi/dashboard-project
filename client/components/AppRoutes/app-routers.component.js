import {Route, Routes} from 'react-router-dom';
import Customers from '../../Pages/Customers';
import Dashboard from '../../Pages/Dashboard';
import Inventory from '../../Pages/Inventory';
import Orders from '../../Pages/Orders';

function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/customers" element={<Customers />} />
    </Routes>
  );
}
export default AppRoutes;
