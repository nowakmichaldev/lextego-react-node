import { EdgeType, NodeType } from './nodes';

export interface QuizStateInterface {
	currentSlug: string;
	currentTitle: string;
	draggedNodes: NodeType[];
	quiz?: QuizInterface;
}

export interface QuizInterface {
	slug: string;
	title: string;
	nodes: NodeType[];
	edges: any[];
	validPaths?: EdgeType[][];
	draggedNodes: NodeType[];
}
