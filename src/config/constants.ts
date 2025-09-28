import dotenv from 'dotenv';
dotenv.config({ path: 'environments/int.env' });

export const API_URL = process.env.API_URL!;
// Тук може да добавяте и други чувствителни данни, които ще се четат от int.env
// export const API_KEY = process.env.API_KEY;
// export const DB_PASSWORD = process.env.DB_PASSWORD;