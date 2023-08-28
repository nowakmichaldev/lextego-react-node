import infoIcon from '../../assets/icons/info.svg';
import { useQuizContext } from '../../context/QuizContext.tsx';
import { NodeType } from '../../types/nodes';

import './SideNav.scss';

export const SideNav = () => {
	const { state } = useQuizContext();
	const { draggedNodes } = state;

	const handleDragStart = (event: React.DragEvent<HTMLDivElement>, node: NodeType) => {
		event.dataTransfer.setData('nodeId', node.id);
	};

	return (
		<div className="side-nav">
			<div className="side-nav-header">
				<img src={infoIcon} alt="Info icon" />
				<h2>Drag and drop the nodes in the correct order</h2>
			</div>
			<div className="side-nav-content">
				{state.quiz &&
					state.quiz.nodes.map((node) => {
						const isDragged = draggedNodes.includes(node);

						return (
							<div
								className="side-nav-node"
								draggable
								key={node.id}
								hidden={isDragged}
								onDragStart={(event) => handleDragStart(event, node)}
							>
								{node.data.label}
							</div>
						);
					})}
			</div>
		</div>
	);
};
