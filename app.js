import express from 'express';
import userRouter from './routes/user.routes.js';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// app.use('/users', userRouter);

export default app;