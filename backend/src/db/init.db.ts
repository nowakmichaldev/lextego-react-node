import { QuizInterface } from '../models';
import { Quizes } from '../schema';

export const initializeDatabase = async (quizesData: QuizInterface[]): Promise<void> => {
	for (const quizData of quizesData) {
		// Check if a document with the same slug already exists
		const existingQuiz = await Quizes.getOne({ slug: quizData.slug });

		// If it doesn't exist, create a new document
		if (!existingQuiz) {
			await Quizes.newQuiz(quizData);
			console.log(`Quiz with slug ${quizData.slug} has been created.`);
		} else {
			console.log(`Quiz with slug ${quizData.slug} already exists.`);
		}
	}
};
