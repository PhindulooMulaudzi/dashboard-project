import {Image} from 'antd';
import Title from 'antd/es/typography/Title';

function AppHeader () {
  return (
    <div className="AppHeader">
      <div className="app-logo">
        <Image
          width={40}
          src="https://cdn-icons-png.flaticon.com/128/7458/7458613.png"
        />
      </div>
      <Title>Dashboard</Title>
      <div className="app-logo">
        <Image
          width={40}
          src="https://cdn-icons-png.flaticon.com/128/7458/7458613.png"
        />
      </div>
    </div>
  );
}
export default AppHeader;
