import {Typography} from 'antd';

function AppFooter () {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+123456789">+123456789</Typography.Link>
      {/* Privacy policy address, i just left google here */}
      <Typography.Link href="https://www.google.com" target={'_blank'}>
        Privacy Policy
      </Typography.Link>
      {/* Terms of use address, i just left google here */}
      <Typography.Link href="https://www.google.com" target={'_blank'}>
        Terms of Use
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
