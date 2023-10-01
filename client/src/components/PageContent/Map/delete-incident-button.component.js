import {Button, Modal} from 'antd';

const deleteIncidentForm = ({id, visible, onClose, onOk}) => {
  const handleOk = () => {
    // Call your fetch function or perform any action on OK
    // For simplicity, we'll just log a message here
    console.log (`Deleting incident with ID ${id}`);
    onOk (); // Call the provided onOk callback
  };

  return (
    <Modal
      visible={visible}
      title="Delete Incident"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Close
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <p>You are about to delete this incident.</p>
    </Modal>
  );
};

export default deleteIncidentForm;
