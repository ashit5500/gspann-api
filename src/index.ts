import app from './app';
import { config } from './config';
import { connectToDatabase } from './config/database';
import http from 'http';

const startServer = async () => {
  const server = http.createServer(app).listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
    connectToDatabase();
  });
};

startServer();
