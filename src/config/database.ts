import mongoose, { Connection } from 'mongoose';
import { config } from './index';

interface ClientConnections {
  [key: string]: Connection;
}

const clientConnections: ClientConnections = {};

export const connectToDatabase = async (): Promise<void> => {
  const dbUri = `${config.DB_URI}`;
  const connection = await mongoose.connect(dbUri);

  if(connection){
    console.log(`Mongoose connected to ${dbUri}`);
  } else {
    console.error(`Mongoose connection error to ${dbUri}:`);
  }
};
