import { useCallback, useEffect, useState } from 'react';

import { getNasaImage } from '../../core/services/nasa.ts';
import { getQuizesFromApi } from '../../core/services/quizes.ts';
import { NasaResponseInterface } from '../../types/nasa';
import { QuizInterface } from '../../types/quiz';

import './Quizes.scss';

export const Quizes = () => {
	const [imageOfTheDay, setImageOfTheDay] = useState<NasaResponseInterface | null>(null);
	const [quizes, setQuizes] = useState<QuizInterface[]>([]);

	const getNasaImgOfTheDay = useCallback(async () => {
		const resp: NasaResponseInterface = await getNasaImage();

		setImageOfTheDay(resp);
	}, []);

	const getQuizes = useCallback(async () => {
		const response = await getQuizesFromApi();

		if (response && response.success && response.body) {
			setQuizes(response.body);
		}
	}, []);

	useEffect(() => {
		void getQuizes();
		void getNasaImgOfTheDay();
	}, [getNasaImgOfTheDay, getQuizes]);

	return (
		<div className="quizes-container">
			{imageOfTheDay && (
				<div className="quizes-container-banner">
					<a href={imageOfTheDay.hdurl} target="_blank">
						<img src={imageOfTheDay.url} alt="Nasa image of the day" />
					</a>
					<p>
						<span>Nasa's image of the day</span>
						{imageOfTheDay.explanation}
					</p>
				</div>
			)}
			<h1 className="font-bold my-2 text-3xl">Quizes</h1>
			{!quizes || !quizes.length ? (
				<p className="font-bold text-3xl opacity-60 my-3">There are no quizes yet.</p>
			) : (
				<>
					{quizes.map((quiz) => (
						<a className="quizes-container-quiz" href={`/q/${quiz.slug}`} key={quiz.slug}>
							{quiz.title}
						</a>
					))}
				</>
			)}
		</div>
	);
};
