import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await fetch('/api/favorites', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        console.log("Response Status:", response.status); // Log status code
        const text = await response.text(); // Get response as text
        console.log("Response Text:", text); // Log response text
    
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
    
        const data = JSON.parse(text); // Parse the response text as JSON
        setFavoriteRecipes(data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    
    fetchFavorites();
  }, [navigate]);

  const handleRemoveFavorite = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    setFavoriteRecipes(prevFavorites => prevFavorites.filter(recipe => recipe._id !== id)); // Use functional update
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-zinc-900 text-white flex py-20">
        <main className="w-full p-6">
          <h2 className="text-2xl font-bold mb-6">Favorite Recipes</h2>
          {isLoading ? (
            <p>Loading favorites...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteRecipes.length > 0 ? (
                favoriteRecipes.map((recipe) => (
                  <div key={recipe._id} className="relative">
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="block bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-lg font-bold">{recipe.title}</h3>
                      <p className="text-sm">Time: {recipe.readyInMinutes} min</p>
                      <p className="text-sm">Servings: {recipe.servings}</p>
                    </Link>
                    <button
                      onClick={() => handleRemoveFavorite(recipe._id)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full"
                      title="Remove from Favorites"
                    >
                      ✖️
                    </button>
                  </div>
                ))
              ) : (
                <p>No favorite recipes yet.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FavoritesPage;
