import { Response, Request } from 'express';

import { responseHandler } from './response.utils';
import { Result } from './result.utils';

export const toControllerFunction =
	<T = unknown, R = unknown, P = unknown>(
		controllerFunction: (req: Request<T, R, P>, res: Response) => Promise<void>
	) =>
	(req: Request<T, R, P>, res: Response) => {
		void controllerFunction(req, res).catch();
	};

export const handleCatch = (res: Response, e: unknown): void => {
	console.error(e);
	let msg = `${JSON.stringify(e)}`;
	if (e instanceof Error) {
		msg = e.message;
	}
	responseHandler(res, Result.fail(msg, 400));
};
