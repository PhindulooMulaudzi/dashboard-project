import {render, screen} from '@testing-library/react';
import App from './App';

test ('renders learn react link', () => {
  render (<App />);
  const linkElement = screen.getByText (/learn react/i);
  expect (linkElement).toBeInTheDocument ();
});

/******Tests assuming the database is connect, we are not mocking****** */

const request = require ('supertest');
const app = require ('../../server/server');

describe ('API Endpoints', () => {
  test ('GET /mines should return status 200', async () => {
    const response = await request (app).get ('/mines');
    expect (response.status).toBe (200);
  });

  test ('GET /contact/:id should return status 200', async () => {
    const response = await request (app).get ('/contact/1'); // this mine id exists ("Diamond Delve Mine")
    expect (response.status).toBe (200);
  });
});
