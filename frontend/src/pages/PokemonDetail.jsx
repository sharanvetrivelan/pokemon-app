import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";

function SimilarPokemon({ types, currentPokemonId }) {
  const [similarPokemon, setSimilarPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSimilarPokemon() {
      try {
        const response = await axios.get("http://localhost:5000/api/pokemon?limit=1025&offset=0");
        const filteredPokemon = response.data
          .filter((pokemon) => {
            const pokemonTypes = pokemon.type
              ? pokemon.type.split(",").map((t) => t.trim().toLowerCase())
              : [];
            return (
              pokemonTypes.length===types.length && pokemonTypes.every((type) => types.includes(type)) &&
              pokemon.id !== currentPokemonId
            );
          })
          .slice(0, 3);
        setSimilarPokemon(filteredPokemon);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching similar Pokémon:", error);
        setLoading(false);
      }
    }
    fetchSimilarPokemon();
  }, [types, currentPokemonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (similarPokemon.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No similar Pokémon found.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Similar Pokémon</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarPokemon.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center cursor-pointer hover:bg-gray-50 group"
          >
            <div className="relative w-24 h-24 mb-2 transform group-hover:scale-105 transition-transform">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-grey-800 group-hover:text-red-600 capitalize mb-1">
              {pokemon.name}
            </h3>
            <p className="text-sm font-semibold text-grey-800 group-hover:text-red-600 capitalize mb-1">{pokemon.type.split(", ").map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(",")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatBar({ label, value}) {
  // Calculate percentage with a max of 100
  const MAX_STATS = {
    HP: 255,
    Attack: 181,
    Defense: 230,
    'Special Attack': 173,
    'Special Defense': 230
  };
  const maxValue = MAX_STATS[label];
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  // Determine color based on value
  const getColor = () => {
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-semibold text-gray-800">{label}</span>
        <span className="text-gray-800">{value}</span>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await axios.get(`http://localhost:5000/api/pokemon/${id}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setLoading(false);
      }
    }
    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-2xl font-bold text-red-500">Pokémon not found.</p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const pokemonTypes = pokemon.type
    ? pokemon.type.split(",").map((t) => t.trim().toLowerCase())
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h1 className="text-4xl font-bold text-center text-red-500 mb-2 capitalize">
            {pokemon.name}
          </h1>
          <p className="font-semibold text-center text-gray-500 text-lg mb-8">
            Pokémon ID: {pokemon.id}
          </p>

          {/* Pokemon Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-full h-full object-contain rounded-xl shadow-md"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Basic Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Info</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Type:</span>
                  <span className="text-gray-800">{pokemon.type.split(", ").map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(",") 
                    }</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Height:</span>
                  <span className="text-gray-800">{pokemon.height / 10} metres</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">Weight:</span>
                  <span className="text-gray-800">{pokemon.weight / 10} kg</span>
                </div>
              </div>
            </div>

            {/* Stats with Progress Bars */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Stats</h2>
              <div className="space-y-4">
                <StatBar label="HP" value={pokemon.hp} />
                <StatBar label="Attack" value={pokemon.attack} />
                <StatBar label="Defense" value={pokemon.defense} />
                <StatBar label="Special Attack" value={pokemon.special_attack} />
                <StatBar label="Special Defense" value={pokemon.special_defense} />
              </div>
            </div>
          </div>

          {/* Similar Pokemon */}
          <SimilarPokemon types={pokemonTypes} currentPokemonId={pokemon.id} />

          {/* Back Button */}
          <div className="flex justify-center mt-8">
            <Link
              to="/"
              state={location.state}
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;