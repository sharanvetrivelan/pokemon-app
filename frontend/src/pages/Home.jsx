import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

function Home() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [paginatedPokemon, setPaginatedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") || "";
  const selectedType = searchParams.get("type") || "All";
  const isSorted = searchParams.get("sort") === "true";

  useEffect(() => {
    async function fetchAllPokemon() {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/pokemon?limit=1025&offset=0");
        setAllPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    }
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    let filtered = allPokemon;

    if (selectedType !== "All") {
      filtered = filtered.filter((pokemon) =>
        pokemon.type.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    if (searchTerm !== "") {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (isSorted) {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredPokemon(filtered);
  }, [allPokemon, searchTerm, selectedType, isSorted]);

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    const currentPagePokemon = filteredPokemon.slice(offset, offset + itemsPerPage);
    setPaginatedPokemon(currentPagePokemon);
  }, [currentPage, filteredPokemon]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchParams({ page: 1, search: term, type: selectedType, sort: isSorted });
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSearchParams({ page: 1, search: searchTerm, type, sort: isSorted });
  };

  const handleSort = () => {
    const sortState = !isSorted;
    setSearchParams({ page: 1, search: searchTerm, type: selectedType, sort: sortState });
  };

  const handleNextPage = () => {
    setSearchParams({ page: currentPage + 1, search: searchTerm, type: selectedType, sort: isSorted });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1, search: searchTerm, type: selectedType, sort: isSorted });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
          Poképedia
        </h1>

        {/* Search Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <input
            type="text"
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
          />
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
          >
            <option value="All">All Types</option>
            <option value="grass">Grass</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="electric">Electric</option>
            <option value="bug">Bug</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="steel">Steel</option>
            <option value="fairy">Fairy</option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="ghost">Ghost</option>
          </select>
          <button
            onClick={handleSort}
            className={`px-6 py-2 rounded-lg transition-all ${
              isSorted
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white font-medium shadow-md hover:shadow-lg`}
          >
            {isSorted ? "Unsort" : "Sort"}
          </button>
        </div>

        {/* Pokemon Grid */}
        {paginatedPokemon.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No Pokémon found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPokemon.map((pokemon) => (
              <Link
                key={pokemon.id}
                to={`/pokemon/${pokemon.id}`}
                state={{
                  selectedType,
                  isSorted,
                  page: currentPage,
                }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50 group"
              >
                <div className="relative w-32 h-32 mb-4 transform group-hover:scale-105 transition-transform">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2 group-hover:text-red-500">
                  {pokemon.name}
                </h3>
                <p className="text-m font-semibold text-gray-800 capitalize mb-2 group-hover:text-red-500">#{pokemon.id}</p>
                <p className="text-m font-semibold text-gray-800 capitalize mb-2 group-hover:text-red-500">
                  {pokemon.type.split(", ").map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(", ")}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredPokemon.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg"
              } text-white font-medium`}
            >
              Previous
            </button>
            <span className="text-lg font-semibold text-gray-800">
              Page {currentPage}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage * itemsPerPage >= filteredPokemon.length}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentPage * itemsPerPage >= filteredPokemon.length
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg"
              } text-white font-medium`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
