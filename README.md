# Verdant Halal - Finland

An interactive, frontend-only Single Page Application (SPA) designed to help users discover verified halal restaurants across Finland. 

[Live Demo](your-railway-url)
[GitHub](your-repo-url)

## Features

- **Interactive Map:** Browse restaurants across Finland using React Leaflet.
- **Data Source:** Fetches data directly from a Google Sheet published as CSV.
- **Search & Filtering:** Search by name/city and filter by cuisine types.
- **Near Me:** Geolocation feature to find nearest restaurants and highlight the top 3.
- **Colored Map Pins:** Distinct Leaflet pins based on cuisine type.
- **Halal Badges:** Clear visual indicators for "Verified Halal" vs "Halal Options".
- **Responsive Design:** 3-panel layout on desktop, optimized stack view on mobile.
- **No Backend Required:** Completely serverless frontend setup.

## Tech Stack

- **Framework:** React 18 + Vite 5
- **Map Integration:** React Leaflet 4.x + Leaflet 1.9.x
- **Styling:** Tailwind CSS 3.x
- **Data Fetching:** Native `fetch()` API (no extra libraries)

## Project Structure

```text
src/
├── components/
│   ├── layout/       # App layout shell, Sidebar, TopBar
│   ├── map/          # Leaflet MapContainer, Markers, Overlays
│   ├── restaurants/  # List views, Cards, Detail Panels, Badges
│   ├── filters/      # Search bar, Cuisine pills
│   └── ui/           # Generic Spinners, Error messages
├── constants/        # Global constants (Center coordinates, map types)
├── hooks/            # Custom React hooks (e.g. useRestaurants)
├── utils/            # CSV parsing, distance calculations, colors
├── App.jsx           # Root container and state management
├── main.jsx          # React DOM mounting
└── index.css         # Tailwind base and global styles
```

## Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd halal-finder-finland
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open `http://localhost:5173` to view the app.

## Data Source

The app reads restaurant data from a public Google Sheets CSV link.
- **Updating Data:** Add rows to the Google Sheet. The web app fetches live on refresh.

## Deployment (Railway)

1. Create a GitHub repository and push your local project.
2. Sign in to [Railway.app](https://railway.app/).
3. Click "New Project" -> "Deploy from GitHub repo".
4. Select your repository. Railway will automatically detect Vite and build the static output.
5. Generate a public domain link in Railway settings.
