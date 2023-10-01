import React from 'react';
import {Modal, Form, Typography} from 'antd';
import {deleteIncident} from '../../services/database-service';

// Function to handle the deletion of an incident and display a confirmation modal
const deleteIncidentForm = (id, description, severity, location) => {
  // Function to handle the deletion of the incident
  const handleOk = () => {
    deleteIncident (id);
  };

  // Initial form values for the incident details
  const formInitialValues = {
    field1: description,
    field2: severity,
    field3: location,
  };

  // Display the confirmation modal with incident details
  return Modal.confirm ({
    title: 'You are about to remove this incident',
    content: (
      <Form initialValues={formInitialValues}>
        <Form.Item label="Description" name="field1">
          <Typography.Text>{description}</Typography.Text>
        </Form.Item>
        <Form.Item label="Severity" name="field2">
          <Typography.Text>{severity}</Typography.Text>
        </Form.Item>
        <Form.Item label="Location" name="field3">
          <Typography.Text>{location}</Typography.Text>
        </Form.Item>
      </Form>
    ),
    onOk: handleOk, // Call the handleOk function when 'OK' is clicked
  });
};

export {deleteIncidentForm}; // Export the deleteIncidentForm function
