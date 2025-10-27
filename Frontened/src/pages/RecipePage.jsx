import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem("searchTerm") || "");
  const [selectedFilters, setSelectedFilters] = useState(() => {
    const saved = localStorage.getItem("selectedFilters");
    return saved ? JSON.parse(saved) : {};
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const apiKey = "2d7622f087bc49fbbf159df11150b5b0";

  // --- Fetch Recipes ---
  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=12&offset=${(page - 1) * 12}`
      );
      const data = await res.json();

      setRecipes((prev) => {
        const newItems = data.results.filter((r) => !prev.some((p) => p.id === r.id));
        return [...prev, ...newItems];
      });

      setHasMore(data.results.length > 0);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // --- Filter Logic ---
  const applyFilters = useCallback(
    (searchValue, filters) => {
      const filtered = recipes.filter((recipe) => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchValue.toLowerCase());
        const matchesCuisine = filters.cuisine ? recipe.cuisine === filters.cuisine : true;
        const matchesDiet = filters.diet ? recipe.diet === filters.diet : true;
        const matchesMealType = filters.mealType ? recipe.mealType === filters.mealType : true;
        const matchesMaxTime = filters.maxTime ? recipe.readyInMinutes <= filters.maxTime : true;
        return matchesSearch && matchesCuisine && matchesDiet && matchesMealType && matchesMaxTime;
      });
      setFilteredRecipes(filtered);
    },
    [recipes]
  );

  useEffect(() => {
    applyFilters(searchTerm, selectedFilters);
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
  }, [searchTerm, selectedFilters, recipes, applyFilters]);

  // --- Handle Search & Filters ---
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (filter) => setSelectedFilters((prev) => ({ ...prev, ...filter }));

  // --- Favorites Logic ---
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      localStorage.setItem("favorites", JSON.stringify([...updated]));
      return updated;
    });
  };

  // --- Infinite Scroll ---
  const lastRecipeRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <Navbar />
      <div className="flex py-20 px-4 md:px-10">
        {/* Sidebar Filters */}
        <aside className="w-1/4 hidden md:block p-6 bg-zinc-800 rounded-xl sticky top-24 h-fit">
          <h2 className="text-xl font-bold mb-4">Search</h2>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-6 p-2 border border-zinc-700 bg-zinc-700 rounded w-full focus:outline-none focus:ring-2 focus:ring-lime-500"
          />

          <h2 className="text-xl font-bold mb-4">Filters</h2>
          {[
            { label: "Cuisine", key: "cuisine", options: ["Italian", "Indian", "Chinese"] },
            { label: "Diet", key: "diet", options: ["Vegetarian", "Vegan", "NonVeg"] },
            { label: "Meal Type", key: "mealType", options: ["Breakfast", "Lunch", "Dinner"] },
          ].map(({ label, key, options }) => (
            <div key={key} className="mb-4">
              <label className="block mb-2">{label}</label>
              <select
                className="bg-zinc-700 text-white p-2 rounded w-full"
                value={selectedFilters[key] || ""}
                onChange={(e) => handleFilterChange({ [key]: e.target.value })}
              >
                <option value="">All {label}s</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="mb-4">
            <label className="block mb-2">Max Prep Time (min)</label>
            <input
              type="number"
              placeholder="e.g. 30"
              className="bg-zinc-700 text-white p-2 rounded w-full"
              value={selectedFilters.maxTime || ""}
              onChange={(e) =>
                handleFilterChange({ maxTime: e.target.value ? parseInt(e.target.value) : undefined })
              }
            />
          </div>

          <Link to="/favorites" className="block mt-6 text-lime-400 hover:underline font-semibold">
            View Favorites →
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-8">Recipes</h2>

          {isLoading && recipes.length === 0 ? (
            <p className="text-gray-400">Loading recipes...</p>
          ) : filteredRecipes.length === 0 ? (
            <p className="text-gray-400">No recipes found. Try adjusting your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRecipes.map((recipe, index) => {
                const isLast = index === filteredRecipes.length - 1;
                return (
                  <div
                    key={recipe.id}
                    ref={isLast ? lastRecipeRef : null}
                    className="relative bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition shadow-sm"
                  >
                    <Link to={`/recipe/${recipe.id}`}>
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-semibold line-clamp-2">{recipe.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        ⏱ {recipe.readyInMinutes || 30} min • 🍽 {recipe.servings || 2} servings
                      </p>
                    </Link>

                    <button
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(recipe.id);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={favorites.has(recipe.id) ? solidHeart : regularHeart}
                        className={`text-xl transition-colors ${
                          favorites.has(recipe.id) ? "text-red-500" : "text-gray-400 hover:text-red-400"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {isLoading && recipes.length > 0 && (
            <p className="text-center text-gray-400 mt-6">Loading more recipes...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default RecipePage;
