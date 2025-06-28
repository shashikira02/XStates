import { useEffect, useState } from "react";
import { fetchCities, fetchCountries, fetchStates } from "./Api";
import Dropdown from "./Components/Dropdown";

export default function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [message, setMessage] = useState("");

  //load countries
  useEffect(() => {
    fetchCountries().then(setCountries).catch(console.error);
  }, []);

  //load states when country changes
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
      return;
    }

    fetchStates(selectedCountry).then(setStates).catch(console.error);
  }, [selectedCountry]);

  //load cities when state changes
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity("");
      return;
    }
    fetchCities(selectedCountry, selectedState)
      .then(setCities)
      .catch(console.error);
  }, [selectedState]);

  //Build final message
  useEffect(() => {
    if (selectedCity && selectedState && selectedCountry) {
      setMessage(
        `You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`
      );
    } else {
      setMessage("");
    }
  }, [selectedCity, selectedState, selectedCountry]);

  return (
    <div className="location">
      <h1>Select Location</h1>
      <Dropdown
        id="country"
        name="country"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        options={countries}
        placeholder="Select Country"
      />

      <Dropdown
        id="state"
        name="state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        options={states}
        disabled={!selectedCountry}
        placeholder="Select State"
      />

      <Dropdown
        id="city"
        name="city"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        options={cities}
        disabled={!selectedState}
        placeholder="Select City"
      />

      {message && (
        <b className="result">
          You selected <strong>{selectedCity}</strong>,
          <span style={{ color: "#2c3e50" }}>
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </b>
      )}
    </div>
  );
}
