import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import RecipePage from './pages/RecipePage'
import MealPlanner from './pages/MealPlanner'
import RecipeDetails from './pages/RecipeDetails'
import Register from './pages/Register'
import Login from "./pages/Login"
import FavoritesPage from './pages/FavoritesPage';
import SmartBites from './pages/SmartBites'
import About from './components/About'



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/mealplanner" element={<MealPlanner />}></Route>
        <Route path='/recipe/:id' element={<RecipeDetails />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/smartbites' element={<SmartBites />}></Route>
      </Routes>
    </Router>

    </>
  )
}

export default App