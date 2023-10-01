import React from 'react';
import {Modal} from 'antd';

const InfoWindow = ({title, content, visible, onClose}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      okText="OK"
    >
      <p>{content}</p>
    </Modal>
  );
};

export default InfoWindow;
