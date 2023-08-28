import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

import { NodeType } from '../types/nodes';
import { QuizInterface, QuizStateInterface } from '../types/quiz';

const initialState: QuizStateInterface = {
	currentSlug: '',
	currentTitle: '',
	draggedNodes: []
};

type ActionType =
	| {
			type: 'SET_CURRENT_SLUG';
			payload: string;
	  }
	| {
			type: 'SET_CURRENT_TITLE';
			payload: string;
	  }
	| {
			type: 'SET_DRAGGED_NODES';
			payload: NodeType[];
	  }
	| {
			type: 'SET_QUIZ';
			payload: QuizInterface;
	  };

const QuizContext = createContext<{
	state: QuizStateInterface;
	dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

const quizReducer = (state: QuizStateInterface, action: ActionType) => {
	switch (action.type) {
		case 'SET_CURRENT_SLUG':
			return {
				...state,
				currentSlug: action.payload
			};
		case 'SET_CURRENT_TITLE':
			return {
				...state,
				currentTitle: action.payload
			};
		case 'SET_DRAGGED_NODES':
			return {
				...state,
				draggedNodes: action.payload
			};
		case 'SET_QUIZ':
			const newSate = {
				...state,
				quiz: action.payload
			};

			if (action.payload.draggedNodes && action.payload.draggedNodes.length) {
				newSate.draggedNodes = action.payload.draggedNodes;
			}

			return newSate;
		default:
			return state;
	}
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(quizReducer, initialState);

	return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => {
	const context = useContext(QuizContext);
	if (context === undefined) {
		throw new Error('useQuizContext must be used within a QuizProvider');
	}
	return context;
};
