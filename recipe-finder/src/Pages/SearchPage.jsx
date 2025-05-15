import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function SearchPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("query") || "";

    const [query, setQuery] = useState(queryParam);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecipes = async (term) => {
        if (!term) return;
        setLoading(true);
        setError(null);

        try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
            let data = await response.json();

            if (!data.meals) {
                response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
                data = await response.json();
            }

            setResults(data.meals || []);
        } catch {
            setError("Failed to fetch recipes.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (query) {
            fetchRecipes(query);
        }
    };

    useEffect(() => {
        if (queryParam) {
            setQuery(queryParam);
            fetchRecipes(queryParam);
        }
    }, [queryParam]);

    return (
        <div className="search-container">
            <h1 className="search-title">Recipe finder</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for recipe..."
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {results.length === 0 && query && !loading && <p>No results found</p>}

            <div className="recipe-grid">
                {results.map(result => (
                    <div key={result.idMeal} className="recipe-item">
                        <Link to={`/recipe/${result.idMeal}`}>
                            <img className="recipe-image" src={result.strMealThumb} alt={result.strMeal} />
                            <p className="recipe-name">{result.strMeal}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
