import React, { useState } from 'react';
import ResultCard from './ResultCard';

const Add = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const onChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            setResults([]);
            return;
        }

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${value}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data.results)) {
                    setResults(data.results);
                } else {
                    setResults([]);
                }
            })
            .catch(() => {
                setResults([]);
            });
    };

    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Search movie"
                            value={query}
                            onChange={onChange}
                        />
                    </div>
                    {Array.isArray(results) && results.length > 0 && (
                        <ul className="results">
                            {results.map((movie) => (
                                <li key={movie.id}>
                                    <ResultCard movie={movie} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Add;
