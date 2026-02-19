const BASE_URL = "https://clearbid-backend-1.onrender.com";

export const createTender = async (tenderData) => {
  const response = await fetch(`${BASE_URL}/api/tender`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tenderData)
  });
  if (!response.ok) throw new Error('Failed to create tender');
  return response.json();
};

export const submitBid = async (bidData) => {
  const response = await fetch(`${BASE_URL}/api/bid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bidData)
  });
  if (!response.ok) throw new Error('Failed to submit bid');
  return response.json();
};

export const getTenders = async () => {
  const response = await fetch(`${BASE_URL}/api/tenders`);
  if (!response.ok) throw new Error('Failed to fetch tenders');
  return response.json();
};

export const getTender = async (tenderId) => {
  const response = await fetch(`${BASE_URL}/api/tender/${tenderId}`);
  if (!response.ok) throw new Error('Failed to fetch tender');
  return response.json();
};

export const getResults = async (tenderId) => {
  const response = await fetch(`${BASE_URL}/api/results/${tenderId}`);
  if (!response.ok) throw new Error('Failed to fetch results');
  return response.json();
};

export const evaluateTender = async (tenderId) => {
  const response = await fetch(`${BASE_URL}/api/evaluate/${tenderId}`, {
    method: 'POST'
  });
  if (!response.ok) throw new Error('Failed to evaluate tender');
  return response.json();
};
