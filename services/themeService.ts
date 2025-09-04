import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // налаштуй на свій бекенд
});

// GET: Отримати тему користувача
export const fetchUserTheme = async (): Promise<'light' | 'dark'> => {
  const { data } = await api.get('/theme');
  return data.theme;
};

// POST або PATCH: Оновити тему користувача
export const updateUserTheme = async (theme: 'light' | 'dark') => {
  const { data } = await api.put('/theme', { theme });
  return data.theme;
};
