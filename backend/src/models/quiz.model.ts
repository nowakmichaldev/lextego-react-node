import { Document, Model, Types } from 'mongoose';

export interface NodeInterface {
	id: string;
	type?: string;
	data: { label: string };
	position: {
		x: number;
		y: number;
	};
}

export interface QuizInterface {
	_id?: string | Types.ObjectId;
	slug: string;
	title: string;
	nodes: NodeInterface[];
	validPaths?: {
		source: string;
		target: string;
	}[][];
	creationDate?: Date;
	lastUpdateDate?: Date;
}

export type QuizType = QuizInterface & Document;

export interface QuizModelInterface extends Model<QuizType> {
	newQuiz(body: Partial<QuizInterface>): Promise<QuizInterface>;

	getMany(query: Partial<QuizInterface>): Promise<QuizInterface[]>;

	getOne(query: Partial<QuizInterface>): Promise<QuizInterface | null>;

	updateOneQuiz(body: Partial<QuizInterface>): Promise<QuizInterface | null>;

	removeOne(body: Partial<QuizInterface>): Promise<QuizInterface | null>;
}
