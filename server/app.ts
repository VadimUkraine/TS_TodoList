import express from 'express';
import cors from 'cors';
import path from 'path';
import todosRoutes from './routes/todo';
import errorHandler from './middlewear/error';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use('/', todosRoutes);
app.use(errorHandler);

export default app;
