import {Image} from 'antd';
import Title from 'antd/es/typography/Title';

function AppHeader () {
  return (
    <div className="AppHeader">
      <div className="app-logo">
        <Image
          width={40}
          src="https://cdn-icons-png.flaticon.com/128/5134/5134533.png"
        />
      </div>
      <Title>Incidents Dashboard</Title>
      <div className="app-logo">
        <Image
          width={40}
          src="https://cdn-icons-png.flaticon.com/128/9971/9971507.png"
        />
      </div>
    </div>
  );
}
export default AppHeader;
