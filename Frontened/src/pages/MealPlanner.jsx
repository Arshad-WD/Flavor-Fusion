import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MealPlanner = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [planDuration, setPlanDuration] = useState('week');


useEffect(() => {
  try {
    const saved = sessionStorage.getItem('mealPlannerData');
    if (!saved) return;
    const parsed = JSON.parse(saved);
    if (parsed.mealPlan) setMealPlan(parsed.mealPlan);
    if (parsed.planDuration) setPlanDuration(parsed.planDuration);
    if (parsed.formValues) formik.setValues(parsed.formValues);
  } catch (err) {
    console.error("Failed to load saved meal plan:", err);
  }
}, []);

  const formik = useFormik({
    initialValues: {
      proteinIntake: '',
      vegOption: '',
      allergy: '',
      weight: '',
      height: '',
    },
    onSubmit: async (values) => {
      const apiKey = "2d7622f087bc49fbbf159df11150b5b0";
      const { proteinIntake, vegOption, allergy } = values;

      try {
        const response = await fetch(
          `https://api.spoonacular.com/mealplanner/generate?targetCalories=${proteinIntake}&diet=${vegOption}&exclude=${allergy}&apiKey=${apiKey}`
        );
        const data = await response.json();
        setMealPlan(data);
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    },
  });

  const renderMealsForDay = (dayMeals, day) => {
    return dayMeals.map((meal, index) => (
      <li
        key={`${day}-${meal.id}-${index}`}
        className="bg-zinc-800/60 p-4 rounded-xl shadow-sm hover:bg-zinc-700/60 transition duration-300"
      >
        <h3 className="text-lg font-semibold text-white">{meal.title}</h3>
        <p className="text-sm text-zinc-400">Ready in {meal.readyInMinutes} min • Serves {meal.servings}</p>
        <img
          src={`https://spoonacular.com/recipeImages/${meal.id}-556x370.jpg`}
          alt={meal.title}
          className="w-full h-40 object-cover rounded-lg mt-3"
        />
        <Link to={`/recipe/${meal.id}`}>
          <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm rounded-lg transition">
            View Recipe
          </button>
        </Link>
      </li>
    ));
  };
  useEffect(() => {
  const dataToSave = {
    mealPlan,
    planDuration,
    formValues: formik.values,
  };
  sessionStorage.setItem('mealPlannerData', JSON.stringify(dataToSave));
}, [mealPlan, planDuration, formik.values]);

  const renderWeeklyPlan = () => {
    if (!mealPlan) return null;

    return (
      <div className="overflow-x-auto mt-6 rounded-lg border border-zinc-700">
        <table className="min-w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-800 text-zinc-200 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Meal 1</th>
              <th className="px-4 py-3">Meal 2</th>
              <th className="px-4 py-3">Meal 3</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {Object.keys(mealPlan.week).map((day) => (
              <tr key={day}>
                <td className="px-4 py-3 font-medium text-white capitalize bg-zinc-900/60">{day}</td>
                {[0, 1, 2].map((i) => (
                  <td key={`${day}-meal-${i}`} className="px-4 py-3 align-top">
                    {mealPlan.week[day].meals[i]
                      ? renderMealsForDay([mealPlan.week[day].meals[i]], day)
                      : <p className="text-zinc-500 text-sm">—</p>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="bg-zinc-950 text-white min-h-screen py-16 px-6 md:px-20">
        <h1 className="text-4xl font-extrabold mb-8 text-center">
          🍽️ AI Meal Planner
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Form */}
          <form
            onSubmit={formik.handleSubmit}
            className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg space-y-5 border border-zinc-800"
          >
            <h2 className="text-2xl font-bold mb-3 border-b border-zinc-700 pb-2">Customize Your Plan</h2>

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Protein Intake (calories)</label>
              <input
                id="proteinIntake"
                name="proteinIntake"
                type="number"
                className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.proteinIntake}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Dietary Preference</label>
              <select
                id="vegOption"
                name="vegOption"
                className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.vegOption}
              >
                <option value="">Select...</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Allergies (comma separated)</label>
              <input
                id="allergy"
                name="allergy"
                type="text"
                className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={formik.handleChange}
                value={formik.values.allergy}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-zinc-300">Weight (kg)</label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={formik.handleChange}
                  value={formik.values.weight}
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-zinc-300">Height (cm)</label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={formik.handleChange}
                  value={formik.values.height}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 text-zinc-300">Plan Duration</label>
              <select
                className="w-full px-3 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPlanDuration(e.target.value)}
                value={planDuration}
              >
                <option value="week">For a Week</option>
                <option value="day">For a Day</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold tracking-wide transition"
            >
              Generate Meal Plan
            </button>
          </form>

          {/* Right Meal Preview */}
          <div className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-zinc-800">
            <h3 className="text-2xl font-semibold mb-4 border-b border-zinc-700 pb-2">
              Today's Suggested Meals
            </h3>
            {mealPlan ? (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderMealsForDay(mealPlan.week[Object.keys(mealPlan.week)[0]].meals, 'today')}
              </ul>
            ) : (
              <p className="text-zinc-400">No plan generated yet.</p>
            )}
          </div>
        </div>

        {/* Weekly Plan */}
        {mealPlan && (
          <div className="mt-12 bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-zinc-800">
            <h3 className="text-2xl font-semibold mb-4 border-b border-zinc-700 pb-2">
              Weekly Meal Plan
            </h3>
            {renderWeeklyPlan()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
