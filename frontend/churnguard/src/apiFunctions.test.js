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


describe('/predict endpoint', () => {
  const completeData = {
    Age: 25, EmploymentStatus: 0, HousingStatus: 1, ActiveMember: 1,
    Country: 'Singapore', EstimatedSalary: 50000, Balance: 1500, Gender: 'Male',
    ProductsNumber: 2, DebitCard: 1, SavingsAccount: 1, FlexiLoan: 1,
    Tenure: 3, DaysSinceLastTransaction: 14, CustomerEngagementScore: 7,
    TechSupportTicketCount: 1, NumberOfAppCrashes: 0, NavigationDifficulty: 6,
    UserFrustration: 0, CustomerSatisfactionSurvey: 8, CustomerServiceCalls: 2, NPS: 9
  };

  test('predicts successfully and returns prediction', async () => {
    fetch.mockResponseOnce(JSON.stringify({ prediction: 'TechDifficulties' }));
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(completeData)
    });
    const result = await response.json();
    expect(result).toEqual({ prediction: 'TechDifficulties' });
    expect(fetch).toHaveBeenCalledWith('/predict', expect.anything());
  });

  test('returns error for missing required features', async () => {
    const incompleteData = { ...completeData };
    delete incompleteData.Age;  // Assume 'Age' is a required field and is missing
    fetch.mockResponseOnce(JSON.stringify({ error: 'Missing one or more of the required features' }), { status: 400 });
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incompleteData)
    });
    const result = await response.json();
    expect(result).toEqual({ error: 'Missing one or more of the required features' });
    expect(response.status).toBe(400);
  });
});


describe('/batch-predict-update endpoint', () => {
  test('batch prediction and updates successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ message: 'Batch prediction and update completed successfully' }));
    const response = await fetch('/batch-predict-update', {
      method: 'GET'
    });
    const result = await response.json();
    expect(result).toEqual({ message: 'Batch prediction and update completed successfully' });
    expect(fetch).toHaveBeenCalledWith('/batch-predict-update', expect.anything());
  });

  test('handles error during batch update', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    const response = await fetch('/batch-predict-update', {
      method: 'GET'
    });
    const result = await response.json();
    expect(result).toEqual({ error: 'Internal Server Error' });
    expect(response.status).toBe(500);
  });
});