/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { movies } from './movies';

const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to server!' });
});

app.get('/movie', (_, res) => {
  res.send(movies);
});

app.get('/search', (req, res) => {
  const a: string = (req.query.q as string) ?? '';
  res.send(
      movies.filter(
          ({ title }) => title.toLowerCase().includes(a.toLowerCase())
      )
  );
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
