import {Modal, Form, Input, Space, Select, Typography} from 'antd';
import {postIncident} from '../../services/database-service';

const {Option} = Select;

// Function to handle the event when adding a new incident
const addIncidentButtonEvent = selectedMine => {
  let formInput = {
    mine_id: selectedMine.id,
    description: '',
    severity: '',
    latitude: '',
    longitude: '',
  };

  // Function to handle 'OK' button click
  const handleOk = () => {
    const hasEmptyValue = Object.values (formInput).some (
      value => value === ''
    );

    if (hasEmptyValue) {
      // Handle the case of not all inputs filled
    } else {
      // API call to commit incident to the database
      postIncident (formInput);
    }
  };

  // Function to handle input change
  const handleInputChange = (field, value) => {
    formInput = {
      ...formInput,
      [field]: value,
    };
  };

  // Initial form values for the incident details
  const formInitialValues = {
    field0: selectedMine.id,
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  };

  // Display the confirmation modal for adding a new incident
  return Modal.confirm ({
    title: 'Enter new incident details',
    content: (
      <Form initialValues={formInitialValues}>
        <Form.Item label="Mine" name="field0">
          <Typography.Text>
            {selectedMine.name}
          </Typography.Text>
        </Form.Item>
        <Form.Item label="Description" name="field1">
          <Input
            placeholder="Head bump"
            onChange={e => handleInputChange ('description', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Severity" name="field2">
          <Select
            placeholder="Select an option"
            style={{width: 200}}
            onChange={value => handleInputChange ('severity', value)}
          >
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Location" style={{marginBottom: 0}}>
          <Space direction="horizontal">
            <Input
              placeholder="Lat: -23.3932"
              type="number"
              onChange={e => handleInputChange ('latitude', e.target.value)}
              step={0.1}
            />
            <Input
              placeholder="Lng: -23.3932"
              type="number"
              onChange={e => handleInputChange ('longitude', e.target.value)}
              step={0.1}
            />
          </Space>
        </Form.Item>
      </Form>
    ),
    onOk: handleOk, // Call the handleOk function when 'OK' is clicked
  });
};

export {addIncidentButtonEvent}; // Export the addIncidentButtonEvent function
