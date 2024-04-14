// Function to check health of backend service
export const testHealth = async () => {
  try {
    const response = await fetch(`/test`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text(); // Using .text() instead of .json() for a string 
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; 
  }
};

// Function to get all data from MongoDB
export const getData = async () => {
  try {
    const response = await fetch(`/data`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; 
  }
};

// Function to get client data from MongoDB
export const getClientData = async (customerID) => {
  try {
    const response = await fetch(`/read-client/${customerID}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; 
  }
};

// Function to delete all data from Mongo
export const deleteDatabase = async () => {
  try {
    const response = await fetch(`/delete-all`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.text(); 
    return result;
  } catch (error) {
    console.error("Failed to delete database:", error);
    throw error;
  }
};

// Function to upload .xlsx file or basically Init the MongoDB, 
// Note: This is automatically done by Docker so this is just if you want to delete and upload another file
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`/upload-all`, {
      method: 'POST',
      body: formData, 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resultText = await response.text(); 
    return resultText;
  } catch (error) {
    console.error("Failed to upload file:", error);
    throw error; 
  }
};

// Function to get suggested client data from MongoDB
export const getSuggestion = async (customerID) => {
  try {
    const response = await fetch(`/suggest-client/${customerID}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; 
  }
};