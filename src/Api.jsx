const BACKEND_POINT = "https://crio-location-selector.onrender.com";

export async function fetchCountries() {
  const res = await fetch(`${BACKEND_POINT}/countries`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
}

export async function fetchStates(countryName) {
  const res = await fetch(`${BACKEND_POINT}/country=${encodeURIComponent(countryName)}/states`);
  if (!res.ok) throw new Error("Failed to fetch states");
  return res.json();
}

export async function fetchCities(countryName, stateName) {
  const res = await fetch(
    `${BACKEND_POINT}/country=${encodeURIComponent(countryName)}/state=${encodeURIComponent(stateName)}/cities`
  );
  if (!res.ok) throw new Error("Failed to fetch cities");
  return res.json();
}