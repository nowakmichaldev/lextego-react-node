import { Router } from 'express';

import { toControllerFunction } from '../../utils/controller.utils';
import { getQuiz, getQuizes } from '../controllers/quiz.controller';

export const quizRouter = Router();

quizRouter.get('/all', toControllerFunction(getQuizes));
quizRouter.get('/one', toControllerFunction(getQuiz));
