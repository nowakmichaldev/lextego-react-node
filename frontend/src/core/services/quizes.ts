import { QuizInterface } from '../../types/quiz';
import { ResponseInterface } from '../../types/response';

const API_URL = import.meta.env.VITE_API_URL;

const QUIZES_URL = `${API_URL}/quizes`;

export const getQuizesFromApi = async (): Promise<ResponseInterface<QuizInterface[]>> => {
	const response = await fetch(`${QUIZES_URL}/all`);
	return (await response.json()) as ResponseInterface<QuizInterface[]>;
};

export const getQuizFromApi = async (slug: string): Promise<ResponseInterface<QuizInterface>> => {
	const response = await fetch(`${QUIZES_URL}/one?slug=${slug}`);
	return (await response.json()) as ResponseInterface<QuizInterface>;
};
