import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // дозволити фронтенд
app.use(express.json());

let userTheme = 'light'; // зберігаємо останню тему

app.get('/theme', (req, res) => {
  res.json({ theme: userTheme });
});

app.put('/theme', (req, res) => {
  const { theme } = req.body;
  if (theme === 'light' || theme === 'dark') {
    userTheme = theme;
    res.json({ theme: userTheme });
  } else {
    res.status(400).json({ message: 'Invalid theme' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
