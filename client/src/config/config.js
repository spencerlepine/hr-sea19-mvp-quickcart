import dotenv from 'dotenv';
dotenv.config();

const config = {
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:8000',
};

export default config;
