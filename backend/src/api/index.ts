import express from 'express';

import { quizRouter } from './routes';

const api = express();

api.use('/quizes', quizRouter);

export default api;
