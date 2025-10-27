import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

function SmartBites() {
  const [leftoverFood, setLeftoverFood] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState("");

  const API_KEY = "";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const handleSubmit = async () => {
    if (!leftoverFood.trim()) {
      setError("Please enter leftover food.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes("");

    const prompt = `
      You are a professional chef. Generate 3 creative, detailed recipes using leftover ${leftoverFood}.
      Include:
      - Recipe name
      - Ingredients list
      - Step-by-step instructions
      - Serving suggestion
      Format clearly with headings and line breaks.
    `;

    try {
      const result = await model.generateContentStream(prompt);
      let responseText = "";

      for await (const chunk of result.stream) {
        const chunkText = await chunk.text();
        responseText += chunkText;
        setRecipes((prev) => (prev + chunkText).replace(/\*+/g, "").trim());
      }

    } catch (err) {
      setError("Error generating recipes. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f0f0f] text-gray-100 py-24 px-6 flex justify-center">
        <div className="w-full max-w-3xl bg-[#161616] border border-zinc-800 rounded-2xl shadow-lg p-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-semibold text-[#cdea68] mb-4">
            SmartBites 🍽️
          </h1>
          <p className="text-gray-400 mb-8 text-lg">
            Transform your leftovers into delicious new dishes — powered by AI.
          </p>

          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={leftoverFood}
              onChange={(e) => setLeftoverFood(e.target.value)}
              placeholder="e.g. leftover rice, chicken curry, or pasta"
              className="flex-1 p-3 rounded-lg bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-[#cdea68] focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium text-black bg-[#cdea68] hover:bg-[#d7f075] transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Generating..." : "Generate Recipes"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 mb-4">{error}</p>}

          {/* Recipe Output */}
          <div
            className="mt-8 whitespace-pre-line leading-relaxed text-gray-200 font-[450] tracking-wide"
            style={{
              lineHeight: "1.8",
            }}
          >
            {recipes ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: recipes
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/## (.*?)\n/g, "<h3 class='text-xl font-semibold mt-6 mb-2 text-[#cdea68]'>$1</h3>")
                    .replace(/- (.*?)\n/g, "• $1<br>")
                    .replace(/\n{2,}/g, "<br><br>")
                }}
              />
            ) : (
              !loading && (
                <p className="text-gray-500">
                  Your generated recipes will appear here. 🍲
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SmartBites;
