
function SearchBar ({search, setSearch, region, setRegion}) {
    return (
        <div  className="controls">
            <input 
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setRegion(e.target.value)}
             />


             <select value={region} onChange={(e)  => setregion(e.target.value)}>
                <option value="all">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
             </select>
        </div>
    );
}

export default SearchBar;