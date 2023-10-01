import {Menu} from 'antd';
import * as Icons from '@ant-design/icons';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

function SideMenu () {
  const location = useLocation ();
  const [selectedKeys, setSelectedKeys] = useState ('/');

  useEffect (
    () => {
      const pathName = location.pathname;
      setSelectedKeys (pathName);
    },
    [location.pathname]
  );

  const navigate = useNavigate ();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={item => {
          navigate (item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: 'Dashboard',
            icon: <Icons.AppstoreAddOutlined />,
            key: '/',
          },
          {
            label: 'Inventory',
            icon: <Icons.ShopOutlined />,
            key: '/inventory',
          },
          {
            label: 'Orders',
            icon: <Icons.ShoppingCartOutlined />,
            key: '/orders',
          },
          {
            label: 'Customers',
            icon: <Icons.UserOutlined />,
            key: '/customers',
          },
        ]}
      />
    </div>
  );
}
export default SideMenu;
