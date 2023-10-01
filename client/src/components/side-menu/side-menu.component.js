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
            label: 'Incident Map',
            icon: <Icons.ShopOutlined />,
            key: '/map',
          },
        ]}
      />
    </div>
  );
}
export default SideMenu;
