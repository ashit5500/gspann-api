import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'mongodb://127.0.0.1:27017/chatbot',
  CRYPTO_ALGORITHM: process.env.CRYPTO_ALGORITHM || 'aes-256-cbc',
  DB_NAME: process.env.DB_NAME || 'aariya_chatbot_db'
};
