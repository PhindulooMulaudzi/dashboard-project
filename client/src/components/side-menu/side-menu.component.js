import {Menu} from 'antd';
import * as Icons from '@ant-design/icons';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

// Functional component for the side menu
function SideMenu () {
  // Get the current location using React Router's useLocation hook
  const location = useLocation ();

  // State to hold the selected key for the menu
  const [selectedKeys, setSelectedKeys] = useState ('/');

  // Effect to update the selected key when the location changes
  useEffect (
    () => {
      const pathName = location.pathname;
      setSelectedKeys (pathName);
    },
    [location.pathname]
  );

  // Hook to navigate to different routes
  const navigate = useNavigate ();

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={item => {
          navigate (item.key); // Navigate to the selected key on menu item click
        }}
        selectedKeys={[selectedKeys]} // Set the selected key in the menu
        items={[
          {
            label: 'Dashboard',
            icon: <Icons.AppstoreAddOutlined />, // Icon for the dashboard menu item
            key: '/', // Key for the dashboard menu item
          },
          {
            label: 'Incident Map',
            icon: <Icons.ShopOutlined />, // Icon for the incident map menu item
            key: '/map', // Key for the incident map menu item
          },
        ]}
      />
    </div>
  );
}

export default SideMenu;
