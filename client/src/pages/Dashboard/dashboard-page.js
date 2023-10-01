import React, {useEffect, useState, useCallback} from 'react';
import {Card, Space, Typography} from 'antd';
import * as Icons from '@ant-design/icons';

import {getContact, getMines} from '../../services/database-service';

import DashboardIncidentsBarChart
  from '../../components/page-content/dashboard/incident-bar-chart.component';
import DashboardCard
  from '../../components/page-content/dashboard/dashboard-card.component';
import DashboardLineChart
  from '../../components/page-content/dashboard/yield-line-chart.component';
import SelectedMineFilter
  from '../../components/page-content/selected-mine-filter.component';

function Dashboard () {
  const [selectedMine, setSelectedMine] = useState (null);
  const [mines, setMines] = useState ([]);
  const [contact, setContact] = useState ([]);

  const handleMineChange = useCallback (value => {
    setSelectedMine (value);
  }, []);

  useEffect (
    () => {
      getMines ().then (minesData => {
        setMines (minesData);
        if (selectedMine == null) {
          handleMineChange (minesData[0].name);
        }
      });
    },
    [handleMineChange, selectedMine]
  );

  const selectedMineData = mines.find (mine => mine.name === selectedMine);

  let mineType = '';
  let product = '';
  let location = '';

  if (selectedMineData) {
    mineType = selectedMineData.type || '';
    product = selectedMineData.production_material || '';
    location = selectedMineData.latitude && selectedMineData.longitude
      ? `${selectedMineData.latitude}, ${selectedMineData.longitude}`
      : '';
  }

  useEffect (
    () => {
      if (selectedMineData) {
        getContact (selectedMineData.contact_person_id).then (res => {
          setContact (res);
        });
      }
    },
    [selectedMineData]
  );

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <SelectedMineFilter
          selectedMine={selectedMine} // Pass the selectedMine state as a prop
          handleMineChange={handleMineChange} // Pass the handler function as a prop
          mines={mines}
        />
        <Card style={{width: '100%', height: '100%'}}>
          <Space direction="vertical">
            <Space direction="horizontal">
              <Space direction="vertical">
                <Card style={{width: '100%', height: '210px'}}>
                  <Space direction="vertical">
                    <Typography.Text>Contact Person</Typography.Text>

                    <Space direction="horizontal">
                      <Space style={{paddingTop: '8px'}}>
                        <Icons.UserOutlined
                          style={{
                            color: 'green',
                            backgroundColor: 'rgba(0,255,0,0.25',
                            borderRadius: 22,
                            fontSize: 24,
                            padding: 8,
                          }}
                        />
                      </Space>
                      {contact && contact.length > 0
                        ? <Space
                            direction="vertical"
                            style={{paddingTop: '10px'}}
                          >
                            <Typography.Text>
                              Name: {contact[0].name + ' ' + contact[0].surname}
                            </Typography.Text>
                            <Typography.Text>
                              Email: {contact[0].email}
                            </Typography.Text>
                            <Typography.Text>
                              Phone: {contact[0].contact_number}
                            </Typography.Text>
                          </Space>
                        : <div />}
                    </Space>
                  </Space>
                </Card>
              </Space>
              <Space direction="vertical">
                <Space direction="horizontal">
                  <DashboardCard
                    icon={
                      <Icons.ShoppingCartOutlined
                        style={{
                          color: 'green',
                          backgroundColor: 'rgba(0,255,0,0.25',
                          borderRadius: 20,
                          fontSize: 24,
                          padding: 8,
                        }}
                      />
                    }
                    title={'Mine Type'}
                    value={mineType}
                  />
                  <DashboardCard
                    icon={
                      <Icons.ShopOutlined
                        style={{
                          color: 'blue',
                          backgroundColor: 'rgba(0,0,255,0.25',
                          borderRadius: 20,
                          fontSize: 24,
                          padding: 8,
                        }}
                      />
                    }
                    title={'Commodity'}
                    value={product}
                  />
                </Space>

                <DashboardCard
                  icon={
                    <Icons.PushpinOutlined
                      style={{
                        color: 'purple',
                        backgroundColor: 'rgba(0,255,255,0.25',
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={'Location'}
                  value={location}
                />
              </Space>
            </Space>
          </Space>
        </Card>

        <Space>
          <DashboardIncidentsBarChart selectedMineData={selectedMineData} />
          <DashboardLineChart selectedMineData={selectedMineData} />
        </Space>
      </Space>
    </div>
  );
}

export default Dashboard;
