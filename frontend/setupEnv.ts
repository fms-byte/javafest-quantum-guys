const appUrl = process.env.NODE_ENV === 'production' ? process.env.APP_URL : 'http://localhost:3000';
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:5000';

export { appUrl, apiUrl };