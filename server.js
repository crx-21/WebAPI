const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

let movies = [];

// Load and clean the CSV into memory on startup
fs.createReadStream('db/Trending_movies.csv')
  .pipe(csv())
  .on('data', (row) => {
    movies.push({
      id: Number(row.id),
      title: row.title,
      originalTitle: row.original_title,
      overview: row.overview || null,
      popularity: Number(row.popularity),
      releaseDate: row.release_date || null,
      language: row.original_language,
      adult: row.adult === 'True',
      voteCount: Number(row.vote_count),
      voteAverage: Number(row.vote_average)
    });
  })
  .on('end', () => {
    console.log(`Loaded ${movies.length} movies into memory.`);
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  });

// GET /api/movies?limit=20&language=en&search=spider
app.get('/api/movies', (req, res) => {
  let results = movies;

  if (req.query.language) {
    results = results.filter((m) => m.language === req.query.language);
  }

  if (req.query.search) {
    const q = req.query.search.toLowerCase();
    results = results.filter((m) => m.title && m.title.toLowerCase().includes(q));
  }

  const limit = Number(req.query.limit) || 20;
  res.json({
    total: results.length,
    results: results.slice(0, limit)
  });
});

// GET /api/movies/:id
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find((m) => m.id === Number(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
});