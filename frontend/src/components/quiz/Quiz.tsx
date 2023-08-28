import { useEffect, useCallback, DragEvent, useRef, useState, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	Connection,
	Edge,
	Node,
	BackgroundVariant,
	useReactFlow,
	ReactFlowProvider
} from 'reactflow';

import { useQuizContext } from '../../context/QuizContext.tsx';
import { getQuizFromApi } from '../../core/services/quizes.ts';
import { EdgeType } from '../../types/nodes';
import { GameOver } from '../game-over/GameOver.tsx';

import './Quiz.scss';

const Quiz = () => {
	const [isGameOver, setIsGameOver] = useState(false);
	const [validPaths, setValidPaths] = useState<EdgeType[][]>([]);

	const flowContainer = useRef<HTMLDivElement | null>(null);

	const [nodes, setNodes, handleNodesChange] = useNodesState([]);
	const [edges, setEdges, handleEdgesChange] = useEdgesState([]);

	const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

	const reactFlowInstance = useReactFlow();

	const { state, dispatch } = useQuizContext();
	const { Quizeslug } = useParams();
	const navigate = useNavigate();

	const getQuiz = useCallback(
		async (slug: string) => {
			const response = await getQuizFromApi(slug);

			if (!response || !response.success || !response.body) {
				navigate('/');

				return;
			}

			const quiz = response.body;

			if (quiz.validPaths) {
				setValidPaths(quiz.validPaths);
			}

			if (quiz.draggedNodes && quiz.draggedNodes.length) {
				setNodes(quiz.draggedNodes);
			}

			if (quiz.edges && quiz.edges.length) {
				setEdges(quiz.edges);
			}

			dispatch({
				type: 'SET_QUIZ',
				payload: quiz
			});

			dispatch({
				type: 'SET_CURRENT_SLUG',
				payload: slug
			});

			dispatch({
				type: 'SET_CURRENT_TITLE',
				payload: quiz.title
			});
		},
		[dispatch, navigate, setEdges, setNodes]
	);

	useEffect(() => {
		if (!Quizeslug) {
			navigate('/');

			return;
		}

		void getQuiz(Quizeslug);
	}, [Quizeslug, getQuiz, navigate]);

	const getMousePosition = (event: MouseEvent<HTMLDivElement>) => {
		if (!reactFlowInstance || !flowContainer.current) {
			return;
		}

		const { left, top } = flowContainer.current.getBoundingClientRect();

		// Get mouse coordinates according to the ReactFlow container position
		const screenX = event.clientX - left;
		const screenY = event.clientY - top;

		// Get react-flow coordinates
		const { x, y } = reactFlowInstance.project({ x: screenX, y: screenY });

		return { x, y };
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		const mousePosition = getMousePosition(event);

		if (!mousePosition) {
			return;
		}

		const { x, y } = mousePosition;

		const nodeId = event.dataTransfer.getData('nodeId');

		const node = state.quiz?.nodes.find((node) => node.id === nodeId);

		if (!node) {
			return;
		}

		const newNode = { ...node, position: { x, y } };

		setNodes((prevNodes) => [...prevNodes, { ...newNode }]);

		if (state.draggedNodes.includes(node)) {
			return;
		}

		dispatch({
			type: 'SET_DRAGGED_NODES',
			payload: [...state.draggedNodes, node]
		});
	};

	useEffect(() => {
		if (!edges.length || !validPaths.length) {
			return;
		}

		const isSubset = (array: EdgeType[], subset: EdgeType[]): boolean =>
			subset.every((elem) =>
				array.some(
					(arrElem) =>
						(arrElem.source === elem.source && arrElem.target === elem.target) ||
						(arrElem.source === elem.target && arrElem.target === elem.source)
				)
			);

		const isValidPath = (edges: EdgeType[], path: EdgeType[]): boolean => isSubset(edges, path);

		const isPathsValid = validPaths.every((path) => isValidPath(edges, path));

		if (isPathsValid) {
			setIsGameOver(true);
		}
	}, [edges]);

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
	};

	const handleNodeDelete = (nodes: Node[]) => {
		const newDraggedNodes = state.draggedNodes.filter((node) => !nodes.find((n) => n.id === node.id));

		dispatch({
			type: 'SET_DRAGGED_NODES',
			payload: newDraggedNodes
		});
	};

	const handleRepeatClick = () => {
		setEdges([]);
		setNodes([]);
		setIsGameOver(false);

		dispatch({
			type: 'SET_DRAGGED_NODES',
			payload: []
		});
	};

	return (
		<div className="quiz-container" ref={flowContainer} onDrop={handleDrop} onDragOver={handleDragOver}>
			{state.quiz && <div className="quiz-container-title">{state.quiz?.title}</div>}
			{isGameOver && (
				<div className="quiz-container-game-over">
					<GameOver onRepeatClick={handleRepeatClick} title={state.currentTitle} />
				</div>
			)}
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={handleNodesChange}
				onNodesDelete={handleNodeDelete}
				onEdgesChange={handleEdgesChange}
				onConnect={onConnect}
			>
				<Controls />
				<MiniMap />
				<Background variant={BackgroundVariant.Lines} gap={12} size={1} />
			</ReactFlow>
		</div>
	);
};

const QuizWithFlowProvider = () => (
	<ReactFlowProvider>
		<Quiz />
	</ReactFlowProvider>
);

export default QuizWithFlowProvider;
