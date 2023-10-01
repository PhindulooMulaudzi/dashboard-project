// Import Axios for making HTTP requests
import Axios from 'axios';

// Function to get mines
export const getMines = () => {
  return Axios.get ('http://localhost:3001/mines')
    .then (response => {
      // Use map to extract the desired data and save it in a list (array)
      const result = response.data.map (mine => mine);
      return result;
    })
    .catch (error => {
      throw new Error ('Error fetching mines:', error);
    });
};

// Function to get contact by id
export const getContact = id => {
  return Axios.get (`http://localhost:3001/contact/${id}`)
    .then (response => {
      const result = response.data;
      return result;
    })
    .catch (error => {
      console.log (error);
      throw new Error ('Error fetching contact:', error);
    });
};

// Function to get production by id
export const getProduction = id => {
  return Axios.get (`http://localhost:3001/production/${id}`)
    .then (response => {
      const result = response.data;
      return result;
    })
    .catch (error => {
      console.log (error);
      throw new Error ('Error fetching production:', error);
    });
};

// Function to get incident count by id
export const getIncidentsCount = id => {
  return Axios.get (`http://localhost:3001/incidents_count/${id}`)
    .then (response => {
      const result = response.data;
      return result;
    })
    .catch (error => {
      console.log (error);
      throw new Error ('Error fetching incident count:', error);
    });
};

// Function to get incidents by id
export const getIncidents = id => {
  return Axios.get (`http://localhost:3001/incidents/${id}`)
    .then (response => {
      const result = response.data;
      return result;
    })
    .catch (error => {
      console.log (error);
      throw new Error ('Error fetching incidents:', error);
    });
};

// Function to post a new incident entry
export const postIncident = entry => {
  Axios.post ('http://localhost:3001/add_incident', entry)
    .then (() => {
      alert ('New incident added, the page will now refresh.');
      window.location.reload (false);
    })
    .catch (() => {
      alert ('Error adding the incident. Please try again later.');
    });
};

// Function to delete an incident by id
export const deleteIncident = id => {
  Axios.delete (`http://localhost:3001/delete_incident/${id}`)
    .then (() => {
      alert ('Incident deleted successfully, the page will now refresh.');
      window.location.reload (false);
    })
    .catch (() => {
      alert ('Error deleting the incident. Please try again later.');
    });
};
