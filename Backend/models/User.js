// models/User.js
import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]

// });

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  favoriteRecipes: [String] // Store recipe IDs as simple strings
});


const User = mongoose.model('User', UserSchema);
export default User;
