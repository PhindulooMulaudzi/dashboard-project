import React, {useCallback, useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, TileLayer, Popup} from 'react-leaflet';
import {Icon, divIcon, point} from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import {Card, Space, Typography} from 'antd';
import {getIncidents, getMines} from '../../services/database-service';
import SelectedMineFilter
  from '../../components/page-content/selected-mine-filter.component';
import {Button} from 'antd';
import {deleteIncidentForm} from '../../pages/map/delete-button-handler';
import {addIncidentButtonEvent} from '../../pages/map/add-button-handler';

// Custom icon for markers
const customIcon = new Icon ({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/186/186250.png',
  iconSize: [38, 38],
});

// Function to create a custom cluster icon
const createCustomClusterIcon = cluster => {
  return new divIcon ({
    html: `<div class="cluster-icon">${cluster.getChildCount ()}</div>`,
    className: 'custom-marker-cluster',
    iconSize: point (33, 33, true),
  });
};

const Inventory = () => {
  const [incidents, setIncidents] = useState ([]);
  const [selectedMine, setSelectedMine] = useState (null);
  const [mines, setMines] = useState ([]);

  let mapCenter = null;
  let mapMarkers = [];

  // Handler for mine change
  const handleMineChange = useCallback (value => {
    setSelectedMine (value);
  }, []);

  // Effect to fetch mines
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

  // Effect to fetch incidents for the selected mine
  useEffect (
    () => {
      if (selectedMineData) {
        const mineId = selectedMineData.id;
        getIncidents (mineId)
          .then (res => {
            if (Array.isArray (res)) {
              setIncidents (res);
            } else {
              console.error ('Production data is not an array:', res);
            }
          })
          .catch (error => {
            console.error ('Error fetching production data:', error);
          });
      }
    },
    [selectedMineData]
  );

  // Populate mapCenter and mapMarkers based on incidents data
  if (incidents) {
    incidents.forEach (incident => {
      if (mapCenter === null) {
        mapCenter = [incident.latitude, incident.longitude];
      }

      mapMarkers.push ({
        id: incident.id,
        geocode: [incident.latitude, incident.longitude],
        description: incident.description,
        severity: incident.severity,
      });
    });
  }

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Incidents Map</Typography.Title>
      <Card>
        <Space direction="vertical">
          <Typography.Paragraph>
            <strong>Instructions:</strong>
          </Typography.Paragraph>
          <Typography.Text>
            <ol>
              <li>Select the mine you want to visualize incidents for.</li>
              <li>
                Click the "Add New Incident" button to create a new incident.
              </li>
              <li>
                Delete an existing incident by clicking the 'delete' button in the incident popup.
              </li>
            </ol>
          </Typography.Text>
        </Space>
      </Card>
      <Space
        direction="horizontal"
        style={{width: '100%', justifyContent: 'space-between'}}
        size="large"
      >
        <div>
          <SelectedMineFilter
            selectedMine={selectedMine}
            handleMineChange={handleMineChange}
            mines={mines}
          />
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => addIncidentButtonEvent (selectedMineData)}
          >
            Add new incident
          </Button>
        </div>
      </Space>
      <Space>
        {mapCenter &&
          mapMarkers &&
          <MapContainer center={[mapCenter[0], mapCenter[1]]} zoom={6}>
            <TileLayer
              attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
              {mapMarkers.map (marker => (
                <Marker
                  key={marker.id}
                  position={marker.geocode}
                  icon={customIcon}
                >
                  <Popup>
                    <div>
                      <strong>Description:</strong> {marker.description}
                      <br />
                      <strong>Severity:</strong> {marker.severity}
                      <br />
                      <Space direction="horizontal" align="center">
                        <Button
                          onClick={() => {
                            deleteIncidentForm (
                              marker.id,
                              marker.description,
                              marker.severity,
                              `${marker.geocode[0]}, ${marker.geocode[1]}`
                            );
                            // handleDeleteMarker (marker.id);
                          }}
                          type="primary"
                        >
                          Delete
                        </Button>
                      </Space>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>}
      </Space>
    </Space>
  );
};

export default Inventory;
