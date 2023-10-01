# Dashboard Visualizing PostgreSQL Data

This repository contains a web dashboard built using Node.js and React that visualizes data from a PostgreSQL database. The project follows a client-server architecture, with the client being a React application and the server being a Node.js backend. The primary features of this dashboard include displaying incidents on a map, enabling incident deletion and addition, showing contact details for selected mines, presenting mine type and commodity information, displaying a bar chart for incidents, and a line chart for yield per year.

## Folder Structure

- `client/`: Contains the React client application.
- `server/`: Contains the Node.js server.
- `data.sql`: SQL script to populate the database with dummy data.

## Dependencies

- **Node.js**: JavaScript runtime environment that allows running JavaScript on the server-side.
- **React**: JavaScript library for building user interfaces.
- **react-leaflet**: React components for Leaflet maps.
- **Axios**: HTTP client for making requests.
- **ant design**: Design system and components for React applications.

## Installation Instructions

1. Clone this repository:
   ```
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies for the client and server:
   ```
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Populate the database with dummy data:
   Run the SQL script to populate the database with dummy data. You can use a PostgreSQL client to execute the script:
   ```
   psql -U <username> -d <database_name> -a -f data.sql
   ```

4. Configure PostgreSQL connection:
   Update the PostgreSQL connection details in the server.js  file (e.g., `server/src/server.js`).

## How to Execute the Application

1. Run the server:
   ```
   cd ../server
   node start
   ```

2. Run the client:
   ```
   cd ../client
   npm start
   ```

3. Access the dashboard in your web browser:
   Open [http://localhost:3000](http://localhost:3000) to view and interact with the dashboard.

## Other Notes

- Ensure that you have the necessary permissions and credentials to access the PostgreSQL database.
- Properly configure the PostgreSQL connection details in the server.
- Regularly update dependencies to the latest versions to benefit from bug fixes and new features.
