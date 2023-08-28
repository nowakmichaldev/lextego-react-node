import { QuizInterface } from '../models';

export const QuizesDefaultData: QuizInterface[] = [
	{
		slug: 'planets-in-our-solar-system',
		title: 'Planets in our solar system',
		nodes: [
			{ id: 'start', data: { label: 'Start' }, position: { x: 0, y: 0 } },
			{ id: 'isGasGiant', data: { label: 'Is a Gas Giant' }, position: { x: 0, y: 0 } },
			{ id: 'isClosestToSun', data: { label: 'Is closest to the Sun' }, position: { x: 0, y: 0 } },
			{ id: 'hasLife', data: { label: 'Has life' }, position: { x: 0, y: 0 } },
			{ id: 'end', data: { label: 'End' }, position: { x: 0, y: 0 } },
			{ id: 'earth', data: { label: 'Earth' }, position: { x: 0, y: 0 } },
			{ id: 'jupiter', data: { label: 'Jupiter' }, position: { x: 0, y: 0 } },
			{ id: 'mercury', data: { label: 'Mercury' }, position: { x: 0, y: 0 } }
		],
		validPaths: [
			[
				{ source: 'start', target: 'isGasGiant' },
				{ source: 'isGasGiant', target: 'jupiter' },
				{ source: 'jupiter', target: 'end' }
			],
			[
				{ source: 'start', target: 'isClosestToSun' },
				{ source: 'isClosestToSun', target: 'mercury' },
				{ source: 'mercury', target: 'end' }
			],
			[
				{ source: 'start', target: 'hasLife' },
				{ source: 'hasLife', target: 'earth' },
				{ source: 'earth', target: 'end' }
			]
		]
	},
	{
		slug: 'space-missions',
		title: 'Space Missions',
		nodes: [
			{ id: 'start', data: { label: 'Start' }, position: { x: 0, y: 0 } },
			{
				id: 'moonMission',
				data: { label: 'First mission to land humans on the Moon' },
				position: { x: 200, y: 0 }
			},
			{ id: 'marsMission', data: { label: 'Mission currently exploring Mars' }, position: { x: 200, y: 100 } },
			{
				id: 'deepSpaceImages',
				data: { label: 'Space telescope providing deep space images' },
				position: { x: 200, y: 200 }
			},
			{ id: 'end', data: { label: 'End' }, position: { x: 400, y: 100 } },
			{ id: 'apollo11', data: { label: 'Apollo 11' }, position: { x: 300, y: 0 } },
			{ id: 'perseverance', data: { label: 'Perseverance' }, position: { x: 300, y: 100 } },
			{ id: 'hubble', data: { label: 'Hubble Telescope' }, position: { x: 300, y: 200 } }
		],
		validPaths: [
			[
				{ source: 'start', target: 'moonMission' },
				{ source: 'moonMission', target: 'apollo11' },
				{ source: 'apollo11', target: 'end' }
			],
			[
				{ source: 'start', target: 'marsMission' },
				{ source: 'marsMission', target: 'perseverance' },
				{ source: 'perseverance', target: 'end' }
			],
			[
				{ source: 'start', target: 'deepSpaceImages' },
				{ source: 'deepSpaceImages', target: 'hubble' },
				{ source: 'hubble', target: 'end' }
			]
		]
	},
	{
		slug: 'astronomical-phenomena',
		title: 'Astronomical Phenomena',
		nodes: [
			{ id: 'start', data: { label: 'Start' }, position: { x: 0, y: 0 } },
			{
				id: 'cometDebris',
				data: { label: "Caused by the Earth passing through a comet's debris" },
				position: { x: 200, y: 0 }
			},
			{ id: 'orbitingStar', data: { label: 'A celestial body orbiting a star' }, position: { x: 200, y: 100 } },
			{ id: 'gasBall', data: { label: 'Glowing ball of gas in space' }, position: { x: 200, y: 200 } },
			{ id: 'end', data: { label: 'End' }, position: { x: 400, y: 100 } },
			{ id: 'meteorShower', data: { label: 'Meteor Shower' }, position: { x: 300, y: 0 } },
			{ id: 'planet', data: { label: 'Planet' }, position: { x: 300, y: 100 } },
			{ id: 'star', data: { label: 'Star' }, position: { x: 300, y: 200 } }
		],
		validPaths: [
			[
				{ source: 'start', target: 'cometDebris' },
				{ source: 'cometDebris', target: 'meteorShower' },
				{ source: 'meteorShower', target: 'end' }
			],
			[
				{ source: 'start', target: 'orbitingStar' },
				{ source: 'orbitingStar', target: 'planet' },
				{ source: 'planet', target: 'end' }
			],
			[
				{ source: 'start', target: 'gasBall' },
				{ source: 'gasBall', target: 'star' },
				{ source: 'star', target: 'end' }
			]
		]
	}
];
