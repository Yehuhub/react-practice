import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

interface Destination {
  id: string;
  value: string;
}

const fetchVehicles = async () => {
  return Promise.resolve(["Car", "Train", "Plane"]);
};

const fetchPrice = async () => {
  return Promise.resolve(Math.random() * 1000);
};

function App() {
  const [startingPoint, setStartingPoint] = useState("");
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      id: uuidv4(),
      value: "",
    },
  ]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [expenseName, setExpenseName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const onDestinationChange = (id: string, value: string) => {
    setDestinations((prev) =>
      prev.map((dest) => (dest.id === id ? { ...dest, value } : dest))
    );
  };

  useEffect(() => {
    const getVehicles = async () => {
      const data = await fetchVehicles();
      setVehicleTypes(data);
    };

    getVehicles();
  }, []);

  useEffect(() => {
    let resultExpense = `${startingPoint}`;
    destinations.forEach((dest) => (resultExpense += ` - ${dest.value}`));

    setExpenseName(resultExpense);
  }, [startingPoint, destinations]);

  const onSubmit = async () => {
    console.log(startingPoint, destinations, selectedVehicle, expenseName);
    const data = await fetchPrice();
    setTotalPrice(data);
  };

  return (
    <div>
      <label htmlFor="startingPoint">Starting Point</label>
      <input
        type="text"
        placeholder="e.g. Berlin"
        name="startingPoint"
        onChange={(e) => setStartingPoint(e.target.value)}
      />
      {destinations.map((dest) => (
        <div key={dest.id}>
          <label htmlFor={dest.id}>Destination</label>
          <input
            type="text"
            placeholder="e.g. London"
            name={dest.id}
            onChange={(e) => onDestinationChange(dest.id, e.target.value)}
          />
        </div>
      ))}
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setDestinations((prev) => [...prev, { id: uuidv4(), value: "" }]);
        }}
      >
        <strong>+ Add Destination</strong>
      </div>
      <label htmlFor="vehicles">Vehicle Type</label>
      <select
        name="vehicles"
        onChange={(e) => setSelectedVehicle(e.target.value)}
      >
        <option value="">Please Select A Vehicle Type</option>
        {vehicleTypes.map((vehicle) => (
          <option key={vehicle} value={vehicle}>
            {vehicle}
          </option>
        ))}
      </select>
      <label htmlFor="expenseName">Expense Name</label>
      <input type="text" name="expenseName" disabled value={expenseName} />
      <div style={{ display: "inline" }}>
        <span>Total Amount: {totalPrice}$</span>
        <button type="button" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
