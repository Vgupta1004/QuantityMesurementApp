const BASE_URL = "http://localhost:3000";

async function getUnits(type) {
  const res = await fetch(`${BASE_URL}/units?type=${type}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

async function getConversion(from, to) {
  const res  = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`);
  const data = await res.json();
  if (!data.length) throw new Error("No conversion found");
  return data[0];
}