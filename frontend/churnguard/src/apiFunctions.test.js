import fetchMock from 'jest-fetch-mock';
import { testHealth, getData, deleteDatabase, uploadFile, deleteClient, addClient, updateClient, readClient } from './Components/services/apiService';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

// Test for checking backend health
test('testHealth returns the health check response', async () => {
  fetch.mockResponseOnce("Good");
  const response = await testHealth();
  expect(response).toBe("Good");
  expect(fetch).toHaveBeenCalledWith(`/test`);
});

// Test for getting all data from MongoDB
test('getData returns data correctly', async () => {
  const mockData = [{ name: "John Doe" }];
  fetch.mockResponseOnce(JSON.stringify(mockData));
  const data = await getData();
  expect(data).toEqual(mockData);
  expect(fetch).toHaveBeenCalledWith(`/data`, { method: 'GET' });
});

// Test for deleting all data from Mongo
test('deleteDatabase returns success message', async () => {
  fetch.mockResponseOnce("Database successfully deleted");
  const result = await deleteDatabase();
  expect(result).toBe("Database successfully deleted");
  expect(fetch).toHaveBeenCalledWith(`/delete-all`, { method: 'DELETE' });
});

// Test for uploading a file
test('uploadFile handles file upload', async () => {
  const mockFile = new Blob(["test"], { type: 'text/plain' });
  const formData = new FormData();
  formData.append('file', mockFile);

  fetch.mockResponseOnce("File uploaded successfully");
  const result = await uploadFile(mockFile);
  expect(result).toBe("File uploaded successfully");
  expect(fetch).toHaveBeenCalledWith(`/upload-all`, { method: 'POST', body: formData });
});

// Tests for CRUD operations on a client
test('deleteClient deletes a client and returns success message', async () => {
  fetch.mockResponseOnce(JSON.stringify({ message: 'Row successfully deleted' }));
  const result = await deleteClient('123');
  expect(result).toEqual({ message: 'Row successfully deleted' });
  expect(fetch).toHaveBeenCalledWith('/delete-client', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: '123' })
  });
});

test('addClient adds a new client and returns success message', async () => {
  const newClient = { CustomerID: 123, name: "Alice" };
  fetch.mockResponseOnce(JSON.stringify({ message: 'Client added successfully', id: '1' }));
  const result = await addClient(newClient);
  expect(result).toEqual({ message: 'Client added successfully', id: '1' });
  expect(fetch).toHaveBeenCalledWith('/create-client', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newClient)
  });
});

test('updateClient updates a client and returns updated data', async () => {
  const updateData = { name: "Alice Updated" };
  fetch.mockResponseOnce(JSON.stringify({ message: 'Client updated successfully', id: '1' }));
  const result = await updateClient('123', updateData);
  expect(result).toEqual({ message: 'Client updated successfully', id: '1' });
  expect(fetch).toHaveBeenCalledWith(`/update-client/123`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData)
  });
});

test('readClient retrieves client details and returns them', async () => {
  const clientData = { name: "Bob" };
  fetch.mockResponseOnce(JSON.stringify(clientData));
  const result = await readClient('123');
  expect(result).toEqual(clientData);
  expect(fetch).toHaveBeenCalledWith(`/read-client/123`, {
    method: 'GET'
  });
});

