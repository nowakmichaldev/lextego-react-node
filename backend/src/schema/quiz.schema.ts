import { Schema, model } from 'mongoose';

import { QuizInterface, QuizModelInterface, QuizType } from '../models';

const Quizeschema = new Schema<QuizInterface>({
	slug: {
		type: Schema.Types.String,
		trim: true,
		minlength: 2,
		maxlength: 60,
		required: true
	},
	title: {
		type: Schema.Types.String,
		trim: true,
		minlength: 2,
		maxlength: 60,
		required: true
	},
	nodes: {
		type: [
			{
				id: {
					type: Schema.Types.String,
					required: true
				},
				type: {
					type: Schema.Types.String
				},
				data: {
					label: {
						type: Schema.Types.String,
						required: true
					}
				},
				position: {
					x: { type: Schema.Types.Number, required: true },
					y: { type: Schema.Types.Number, required: true }
				}
			}
		],
		required: true
	},
	validPaths: {
		type: [
			[
				{
					source: {
						type: Schema.Types.String,
						required: true
					},
					target: {
						type: Schema.Types.String,
						required: true
					}
				}
			]
		]
	},
	creationDate: {
		type: Schema.Types.Date,
		default: Date.now()
	},
	lastUpdateDate: {
		type: Schema.Types.Date,
		default: Date.now()
	}
});

Quizeschema.statics.newQuiz = async (body: QuizInterface): Promise<QuizInterface> => {
	const Quiz = new Quizes(body);

	return (await Quiz.save()) as QuizInterface;
};

Quizeschema.statics.getMany = async (query: Partial<QuizInterface>): Promise<QuizInterface[]> =>
	await Quizes.find(query).exec();

Quizeschema.statics.getOne = async (query: Partial<QuizInterface>): Promise<QuizInterface | null> => {
	const doc = (await Quizes.findOne(query).exec())?.toJSON();

	if (!doc) {
		return null;
	}

	return doc as QuizInterface;
};

Quizeschema.statics.updateOneQuiz = async (body: Partial<QuizInterface>): Promise<QuizInterface | null> => {
	const { _id, ...others } = body;

	return (
		await Quizes.findOneAndUpdate({ _id }, { ...others, lastUpdateDate: Date.now() }, { new: true }).exec()
	)?.toJSON() as QuizInterface | null;
};

Quizeschema.statics.removeOne = async (body: QuizInterface): Promise<QuizInterface | null> =>
	await Quizes.findByIdAndDelete(body._id).exec();

export const Quizes = model<QuizType, QuizModelInterface>('quiz', Quizeschema);
