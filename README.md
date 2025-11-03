# ROSP Lab Mini project

# Flavor-Fusion

AI-powered recipe discovery, meal planning, and smart leftover recipe generator.

- Frontend: React + Vite + Tailwind — pages and components live in [Frontened/src](Frontened/src).
- Backend: Minimal Express API for auth & favorites — server in [Backend/server.js](Backend/server.js).

Demo pages and important code:
- Recipe browsing: [`RecipePage`](Frontened/src/pages/RecipePage.jsx) — [Frontened/src/pages/RecipePage.jsx](Frontened/src/pages/RecipePage.jsx)  
- Recipe details + speech: [`RecipeDetails`](Frontened/src/pages/RecipeDetails.jsx) — [Frontened/src/pages/RecipeDetails.jsx](Frontened/src/pages/RecipeDetails.jsx)  
- AI Meal Planner: [`MealPlanner`](Frontened/src/pages/MealPlanner.jsx) — [Frontened/src/pages/MealPlanner.jsx](Frontened/src/pages/MealPlanner.jsx)  
- Leftover -> recipes (Generative AI): [`SmartBites`](Frontened/src/pages/SmartBites.jsx) — [Frontened/src/pages/SmartBites.jsx](Frontened/src/pages/SmartBites.jsx)  
- Shared UI: [`Navbar`](Frontened/src/components/Navbar.jsx) — [Frontened/src/components/Navbar.jsx](Frontened/src/components/Navbar.jsx)

Backend important files:
- Server entry: [Backend/server.js](Backend/server.js)  
- User model: [`User`](Backend/models/User.js) — [Backend/models/User.js](Backend/models/User.js)  
- Routes: [Backend/routes/auth.js](Backend/routes/auth.js), [Backend/routes/favourite.js](Backend/routes/favourite.js)

Contents
- Features
- Tech stack
- Local setup (frontend & backend)
- Environment variables
- Development & build
- Contributing
- License

Features
- Browse and search recipes with infinite scroll ([Frontened/src/pages/RecipePage.jsx](Frontened/src/pages/RecipePage.jsx)).
- Detailed recipe view with instructions, nutrition and speech controls ([Frontened/src/pages/RecipeDetails.jsx](Frontened/src/pages/RecipeDetails.jsx)).
- AI meal planner that uses Spoonacular to generate weekly/day plans ([Frontened/src/pages/MealPlanner.jsx](Frontened/src/pages/MealPlanner.jsx)).
- SmartBites: generate creative recipes from leftovers using a generative AI model ([Frontened/src/pages/SmartBites.jsx](Frontened/src/pages/SmartBites.jsx)).
- Favorites and simple backend auth/favorite endpoints ([Backend/routes/auth.js](Backend/routes/auth.js), [Backend/routes/favourite.js](Backend/routes/favourite.js)).

Tech stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- External APIs: Spoonacular (recipes) and a Generative AI API (configured in frontend .env)

Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- (Optional) MongoDB instance if backend persists users/favorites

Environment variables
- Frontend: edit [Frontened/.env](Frontened/.env)
  - SPOON_API — your Spoonacular API key
  - AI_API — your generative AI API key
- Backend: create a [Backend/.env](Backend/.env) with typical values:
  - MONGODB_URI, JWT_SECRET, PORT

Example .env (do NOT commit actual keys)
```bash
# Frontend (.env)
SPOON_API=your_spoonacular_key_here
AI_API=your_ai_key_here
```

Local setup

1. Clone repository (already in workspace)
2. Backend
```bash
# filepath: Flavor-Fusion/README.md
cd Backend
npm install
# if package.json has a start script:
npm run start
# OR
node server.js
```
Files: [Backend/package.json](Backend/package.json), [Backend/server.js](Backend/server.js)

3. Frontend
```bash
# filepath: Flavor-Fusion/README.md
cd Frontened
npm install
npm run dev
```
Files: [Frontened/package.json](Frontened/package.json), [Frontened/index.html](Frontened/index.html)

Common tasks
- Run frontend tests (if added): cd Frontened && npm test
- Build frontend for production: cd Frontened && npm run build
- Lint: cd Frontened && npm run lint (if script present)

Notes & tips
- The frontend persists some UI state to localStorage/sessionStorage (see [`RecipePage`](Frontened/src/pages/RecipePage.jsx) and [`MealPlanner`](Frontened/src/pages/MealPlanner.jsx)).
- Generative AI streaming used in [`SmartBites`](Frontened/src/pages/SmartBites.jsx); ensure your AI API supports streaming or adapt the implementation.
- Images for recipes use Spoonacular URLs in [`MealPlanner`](Frontened/src/pages/MealPlanner.jsx) and [`RecipePage`](Frontened/src/pages/RecipePage.jsx).

Contributing
- Fork, create a feature branch, make changes, open a PR.
- Keep secrets out of commits; use .env and add keys to your environment or CI secrets.

License
See [LICENSE](LICENSE) for license details.

Acknowledgements
- Spoonacular API (recipe data)
- Generative AI provider used in SmartBites (configure via [Frontened/.env](Frontened/.env))

If you want, I can:
- Add a step-by-step setup script to connect frontend <-> backend,
- Harden env handling and add .env.example files for both [Frontened/.env](Frontened/.env) and [Backend/.env](Backend/.env).