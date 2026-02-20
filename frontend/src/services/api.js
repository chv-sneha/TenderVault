const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

const handleError = (error, context) => {
  console.error(`${context}:`, error);
  const msg = (error && error.message) ? error.message : String(error);
  if (msg.includes('Failed to fetch') || msg.includes('Network error')) {
    throw new Error('Network error connecting to backend. Check VITE_BACKEND_URL and backend status.');
  }
  throw error;
};

export const createTender = async (tenderData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/tender`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tenderData)
    });
    return await handleResponse(response);
  } catch (error) {
    handleError(error, 'Create Tender');
  }
};

export const submitBid = async (bidData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bidData)
    });
    return await handleResponse(response);
  } catch (error) {
    handleError(error, 'Submit Bid');
  }
};

export const getTenders = async () => {
  try {
    console.log('Fetching tenders from:', `${BASE_URL}/api/tenders`);
    const response = await fetch(`${BASE_URL}/api/tenders`);
    const data = await handleResponse(response);
    console.log('Tenders received:', data);
    return data;
  } catch (error) {
    handleError(error, 'Get Tenders');
  }
};

export const getTender = async (tenderId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/tender/${tenderId}`);
    return await handleResponse(response);
  } catch (error) {
    handleError(error, 'Get Tender');
  }
};

export const getResults = async (tenderId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/results/${tenderId}`);
    return await handleResponse(response);
  } catch (error) {
    handleError(error, 'Get Results');
  }
};

export const evaluateTender = async (tenderId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/evaluate/${tenderId}`, {
      method: 'POST'
    });
    return await handleResponse(response);
  } catch (error) {
    handleError(error, 'Evaluate Tender');
  }
};

export const getUserTenders = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/tenders`);
    return await handleResponse(response);
  } catch (error) {
    handleError(error, 'Get User Tenders');
  }
};

export const getUserBids = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId}/bids`);
    return await handleResponse(response);
  } catch (error) {
    handleError(error, 'Get User Bids');
  }
};
