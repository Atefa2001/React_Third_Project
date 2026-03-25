import { useEffect, useState } from 'react'
import './App.css'
import CountryCard from './components/countryCard';
import SearchBar from './components/searchBar';



function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setloading] = useState(false);
  const[error, setError,] = useState(null);
  const[search, setSearch] = useState("");
  const[region, setRegion] = useState("all");


  const [favorites, setFavorites] =useState(() =>{
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setloading(true);
        setError(null);

        let url ="https://restcountries.com/v3.1/all";

        if(search.length >=2) {
          url = `https://restcountries.com/v3.1/name/${search}`;
        }else if (region !== "all") {
          url = `https://restcountries.com/v3.1/region/${region}`;
        }

        const res = await fetch(url);
        if(!res.ok) throw new Error("Failed to  fetch");


        const data = await res.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setloading(false);
      }
    };


    fetchCountries();
  },  [search, region]);





  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className='container'>
      <h1>Countries Explorer</h1>

      <SearchBar
      search={search}
      setSearch={setSearch}
      region={region}
      setRegion={setRegion}
      />

      {loading && <p>Loading countries...</p>}

      {error && (
        <div>
          <p>Error: {error}</p>
          <button  onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}


      {!loading && !error && countries.length === 0 && (
        <p>No results found</p>
      )}

      <div className='grid'>
        {countries.map((country) => (
          <CountryCard
          key={country.cca3}
          country={country}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
