import React from 'react';
import {Modal, Form, Typography} from 'antd';
import {deleteIncident} from '../API';

const deleteIncidentForm = (id, description, severity, location) => {
  const handleOk = () => {
    deleteIncident (id);
  };

  const formInitialValues = {
    field1: description,
    field2: severity,
    field3: location,
  };

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
    onOk: handleOk,
  });
};

export {deleteIncidentForm};
