import express from 'express';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to gspann tech api',
    })
});

app.use(errorHandler);

export default app;
