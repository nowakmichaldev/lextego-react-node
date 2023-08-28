import { Response, Request } from 'express';

import { QuizInterface } from '../../models';
import { Quizes } from '../../schema';
import { handleCatch } from '../../utils/controller.utils';
import { responseHandler } from '../../utils/response.utils';
import { Result } from '../../utils/result.utils';

export const getQuizes = async (req: Request, res: Response): Promise<void> => {
	try {
		const quizes: QuizInterface[] = await Quizes.getMany({});

		responseHandler<QuizInterface[]>(
			res,
			Result.ok<QuizInterface[]>(
				quizes.sort((a, b) => {
					if (a.slug < b.slug) {
						return -1;
					}
					if (a.slug > b.slug) {
						return 1;
					}
					return 0;
				})
			)
		);
	} catch (e) {
		handleCatch(res, e);
	}
};

export const getQuiz = async (req: Request, res: Response): Promise<void> => {
	try {
		const slug = req.query.slug as string | undefined;

		if (!slug) {
			responseHandler<QuizInterface[]>(res, Result.fail<QuizInterface[]>('No slug provided'));
			return;
		}

		const quiz: QuizInterface = await Quizes.getOne({ slug });

		responseHandler<QuizInterface>(res, Result.ok<QuizInterface>(quiz));
	} catch (e) {
		handleCatch(res, e);
	}
};
