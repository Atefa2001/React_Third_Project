
function CountryCard ({country, favorites, toggleFavorite}) {
    const isFav = favorites.includes(country.cca3);

    return (
        <div className="card">
            <img   src={country.flags?.png || "https://via.placeholder.com/300x200?text=No+Image"} 
                    alt={country.name?.common}  />


            <h3>{country.name?.common}</h3>
            <p>Region: {country.region}</p>
            <p>Population:{country.population?.toLocaleString()}</p>

            <button
            className={isFav ? "fav active" : "fav"}
            onClick={() => toggleFavorite(country.cca3)}>
                {isFav ? "Favorited" : "Add to favorite"}
            </button>
        </div>
    );
}


export default CountryCard;