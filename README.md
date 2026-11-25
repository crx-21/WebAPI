# Trending Movies REST API

A lightweight Express.js REST API that loads a 10,000-movie CSV dataset into memory and serves searchable, filterable JSON endpoints.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (included with Node.js)

## Project Structure

```text
├── server.js               # Express server, CSV loader, and API routes
├── db
  ├─ Trending_movies.csv    # Dataset of 10,000 trending movies
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Locked dependency versions
└── .gitignore              # Ignored files (node_modules, .env)
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/crx-21/WebAPI.git
   cd WebAPI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   *(For development with automatic restarts on file changes, run `npm run dev`.)*

   Once the CSV finishes loading, you will see:
   ```text
   Loaded 10000 movies into memory.
   Server running at http://localhost:3000
   ```

## API Endpoints

### 1. Get Movies (with Search & Filtering)
Returns a list of movies matching optional query filters.

- **URL:** `/api/movies`
- **Method:** `GET`
- **Query Parameters:**
  | Parameter | Type | Default | Description |
  | :--- | :--- | :--- | :--- |
  | `search` | string | — | Case-insensitive partial match on movie title |
  | `language` | string | — | Filter by two-letter ISO original language code (e.g., `en`, `ja`, `es`) |
  | `limit` | number | `20` | Maximum number of results to return |

- **Example Request:**
  ```http
  GET http://localhost:3000/api/movies?search=spider&language=en&limit=2
  ```

- **Example Response (`200 OK`):**
  ```json
  {
    "total": 18,
    "results": [
      {
        "id": 969681,
        "title": "Spider-Man: Brand New Day",
        "originalTitle": "Spider-Man: Brand New Day",
        "overview": "Fighting crime full-time as Spider-Man...",
        "popularity": 1284.3495,
        "releaseDate": "2026-07-29",
        "language": "en",
        "adult": false,
        "voteCount": 5923,
        "voteAverage": 8.47
      }
    ]
  }
  ```

---

### 2. Get Movie by ID
Returns full details for a single movie by its dataset ID.

- **URL:** `/api/movies/:id`
- **Method:** `GET`
- **URL Parameters:**
  | Parameter | Type | Description |
  | :--- | :--- | :--- |
  | `id` | number | Unique movie ID |

- **Example Request:**
  ```http
  GET http://localhost:3000/api/movies/969681
  ```

- **Success Response (`200 OK`):** Returns the single movie JSON object.
- **Error Response (`404 Not Found`):**
  ```json
  {
    "error": "Movie not found"
  }
  ```