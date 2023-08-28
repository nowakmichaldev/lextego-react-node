import { Response } from 'express';

import { Result } from './result.utils';

import { ResponseInterface } from '../types/response.types';

export const responseToJSON = <T = unknown>(result: Result<T>, message?: string, body?: T): ResponseInterface<T> => {
	const response: ResponseInterface<T> = { success: result.isSuccess };
	if (!result.isSuccess && result.error) {
		response.message = result.error;
		return response;
	}

	if (message) {
		response.message = message;
	}

	if (body) {
		response.body = body;
	}

	if (result.isSuccess && result.getValue()) {
		response.body = result.getValue();
	}

	return response;
};

export const responseHandler = <T = unknown>(res: Response, result: Result<T>, message?: string, body?: T): void => {
	res.status(result.status);
	if (message && body) {
		res.json(responseToJSON<T>(result, message, body));
		return;
	} else if (message) {
		res.json(responseToJSON<T>(result, message));
		return;
	} else {
		res.json(responseToJSON<T>(result));
		return;
	}
};
