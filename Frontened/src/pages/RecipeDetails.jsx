import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import DOMPurify from "dompurify";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [nutrition, setNutrition] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const apiKey = "2d7622f087bc49fbbf159df11150b5b0";

    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe details: ${response.status}`);
        }

        const data = await response.json();
        setRecipeDetails(data);

        if (data.nutrition?.nutrients) {
          const mainNutrients = data.nutrition.nutrients.filter((n) =>
            ["Calories", "Protein", "Fat", "Carbohydrates"].includes(n.name)
          );
          setNutrition(mainNutrients);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching recipe details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Load voices for speech synthesis
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(
        availableVoices.find((v) => v.name.includes("Google US English")) ||
          availableVoices[0]
      );
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    fetchRecipeDetails();
  }, [id]);

  const handleAddToCart = () => {
    alert("Recipe added to cart!");
  };

  const speakSteps = (steps) => {
    if (utterance) speechSynthesis.cancel();

    const newUtterance = new SpeechSynthesisUtterance(steps);
    newUtterance.voice = selectedVoice;
    setUtterance(newUtterance);
    speechSynthesis.speak(newUtterance);
  };

  const handlePause = () => speechSynthesis.pause();
  const handleResume = () => speechSynthesis.resume();
  const handleStop = () => speechSynthesis.cancel();

  if (isLoading)
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p className="text-lg animate-pulse">Loading recipe details...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-zinc-900 text-red-400 flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-zinc-900 text-white p-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Title + Image */}
          <h1 className="text-3xl font-bold mb-6 text-blue-400">
            {recipeDetails.title}
          </h1>
          <img
            src={recipeDetails.image}
            alt={recipeDetails.title}
            className="w-full h-auto mb-6 rounded-lg shadow-lg"
          />

          {/* Summary */}
          <div className="text-lg mb-6 leading-relaxed">
            <h2 className="font-bold text-2xl mb-4">Summary</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(recipeDetails.summary),
              }}
            />
          </div>

          {/* Ingredients */}
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="mb-6 list-disc list-inside text-gray-300">
            {recipeDetails.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>

          {/* Instructions */}
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          {recipeDetails.analyzedInstructions?.length > 0 ? (
            <div className="space-y-4">
              {recipeDetails.analyzedInstructions[0].steps.map((step) => (
                <p key={step.number}>
                  <span className="font-bold text-blue-300">
                    Step {step.number}:
                  </span>{" "}
                  {step.step}
                </p>
              ))}

              {/* Voice Controls */}
              <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Read Steps Aloud 🎤
                </h3>
                <button
                  onClick={() =>
                    speakSteps(
                      recipeDetails.analyzedInstructions[0].steps
                        .map((step) => step.step)
                        .join(". ")
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 mr-2"
                >
                  Read Steps
                </button>

                <button
                  onClick={handlePause}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 mr-2"
                >
                  Pause
                </button>
                <button
                  onClick={handleResume}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 mr-2"
                >
                  Resume
                </button>
                <button
                  onClick={handleStop}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                >
                  Stop
                </button>

                {/* Voice Selector */}
                <div className="mt-4">
                  <label className="block text-sm mb-2">Select Voice:</label>
                  <select
                    value={selectedVoice?.name}
                    onChange={(e) =>
                      setSelectedVoice(
                        voices.find((v) => v.name === e.target.value)
                      )
                    }
                    className="p-2 rounded bg-zinc-700 text-white"
                  >
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <p>No instructions available for this recipe.</p>
          )}

          {/* Nutrition Section */}
          <h2 className="text-2xl font-bold mb-4 mt-8">
            Nutritional Information
          </h2>
          {nutrition.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-800 p-4 rounded-lg">
              {nutrition.map((item) => (
                <div key={item.name}>
                  <span className="font-semibold text-white">{item.name}:</span>{" "}
                  {item.amount} {item.unit}
                </div>
              ))}
            </div>
          ) : (
            <p>No nutritional information available.</p>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
