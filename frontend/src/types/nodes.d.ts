export type NodeType = {
	id: string;
	type?: string;
	data: { label: string };
	position: { x: number; y: number };
};

export type EdgeType = {
	id?: string;
	source: string;
	target: string;
	type?: string;
};
