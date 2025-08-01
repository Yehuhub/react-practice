import { useEffect, useState } from "react";
import "./App.css";

interface UserDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
}

//this is just a quick solution for this exercise, a better solution would be to
//define all the types in the actual response and then this function is not necessary
const mapObjectToUserDetails = (rawUser: unknown): UserDetails => {
  const user = rawUser as {
    id: number;
    name: string;
    email: string;
    phone: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  };

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    company: user.company.name,
  };
};

const API_URL = "https://jsonplaceholder.typicode.com/users";

function UserComponent(props: { user: UserDetails }) {
  const { name, email, phone, company } = props.user;

  return (
    <div className="user-container">
      <h1>{name}</h1>
      <h2 className="secondary-header">{company}</h2>
      <div className="p-container">
        <p>Phone number: {phone}</p>
        <p>Email Address: {email}</p>
      </div>
    </div>
  );
}

function App() {
  const [userDetailsList, setUserDetailsList] = useState<UserDetails[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const result = await fetch(API_URL);
        if (!result.ok) throw new Error("failed to fetch data from the api");
        const asJson = await result.json();

        setUserDetailsList(
          asJson.map((user: unknown) => mapObjectToUserDetails(user))
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unexpected error occured"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by username here"
        value={currentSearch}
        onChange={(e) => setCurrentSearch(e.target.value)}
      />
      <button onClick={() => setCurrentSearch("")}>Clear</button>
      {userDetailsList
        .filter((user) =>
          user.name.toLowerCase().includes(currentSearch.toLowerCase())
        )
        ?.map((user) => (
          <UserComponent key={user.id} user={user} />
        ))}
    </div>
  );
}

export default App;
