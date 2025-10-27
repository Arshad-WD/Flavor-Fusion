// routes/favorites.js
import express from 'express';
import User from '../models/User.js';
import { verifyToken } from './auth.js'; // Middleware to verify JWT

const router = express.Router();

// Add a favorite recipe
router.post('/', verifyToken, async (req, res) => {
  const { recipeId } = req.body; // Expect recipeId from frontend

  try {
    const user = await User.findById(req.userId);
    if (!user.favoriteRecipes.includes(recipeId)) {
      user.favoriteRecipes.push(recipeId); // Push the recipe ID directly
      await user.save();
      res.status(201).json({ message: 'Recipe added to favorites' });
    } else {
      res.status(400).json({ message: 'Recipe already in favorites' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding favorite recipe' });
  }
});

// Remove a favorite recipe
router.delete('/:recipeId', verifyToken, async (req, res) => {
  const { recipeId } = req.params;

  try {
    const user = await User.findById(req.userId);
    user.favoriteRecipes = user.favoriteRecipes.filter((fav) => fav !== recipeId);
    await user.save();
    res.json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite recipe' });
  }
});


export default router;
