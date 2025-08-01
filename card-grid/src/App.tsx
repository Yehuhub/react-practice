import "./App.css";

interface Flower {
  name: string;
  url: string;
  breed: string;
  description: string;
  age: number;
}

const allFlowers: Flower[] = [
  {
    url: "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
    name: "Magnolia",
    breed: "Flowous Magnificous",
    description:
      "It is purple, bold, and beautiful, you wont regret buying this gorgeous plant.",
    age: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
    name: "Magnolia",
    breed: "Flowous Magnificous",
    description:
      "It is purple, bold, and beautiful, you wont regret buying this gorgeous plant.",
    age: 2000,
  },
  {
    url: "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
    name: "Magnolia",
    breed: "Flowous Magnificous",
    description:
      "It is purple, bold, and beautiful, you wont regret buying this gorgeous plant.",
    age: 2000,
  },
  {
    url: "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
    name: "Magnolia",
    breed: "Flowous Magnificous",
    description:
      "It is purple, bold, and beautiful, you wont regret buying this gorgeous plant.",
    age: 2000,
  },
  {
    url: "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
    name: "Magnolia",
    breed: "Flowous Magnificous",
    description:
      "It is purple, bold, and beautiful, you wont regret buying this gorgeous plant.",
    age: 2000,
  },
  {
    url: "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
    name: "Magnolia",
    breed: "Flowous Magnificous",
    description:
      "It is purple, bold, and beautiful, you wont regret buying this gorgeous plant.",
    age: 2000,
  },
  {
    url: "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
    name: "Magnolia",
    breed: "Flowous Magnificous",
    description:
      "It is purple, bold, and beautiful, you wont regret buying this gorgeous plant.",
    age: 2000,
  },
  {
    url: "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
    name: "Magnolia",
    breed: "Flowous Magnificous",
    description:
      "It is purple, bold, and beautiful, you wont regret buying this gorgeous plant.",
    age: 2000,
  },
];

function FlowerCard(props: { flower: Flower }) {
  const { url, name, breed, description, age } = props.flower;
  return (
    <div className="card">
      <img src={url} alt="flower image" />
      <div className="card-body">
        <h1>{name}</h1>
        <h2>
          {breed} - {age} {age === 1 ? "year" : "years"}
        </h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function App() {
  const MAX_CARDS = 6;
  return (
    <div className="card-container">
      {allFlowers.slice(0, MAX_CARDS).map((flower) => (
        <FlowerCard flower={flower} />
      ))}
    </div>
  );
}

export default App;
