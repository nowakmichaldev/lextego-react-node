import { useCallback, useEffect, useState } from 'react';

import { getSearchGifs, getTrendingGifs } from '../../core/services/giphy.ts';
import { getRandomNumber } from '../../helpers/getRandomNumberHelper.ts';
import { RepeatIcon } from '../../icons/RepeatIcon.tsx';

import './GameOver.scss';

type GameOverPropsType = {
	onRepeatClick: () => void;
	title?: string;
};

export const GameOver = ({ onRepeatClick, title }: GameOverPropsType) => {
	const [gifURL, setGifURL] = useState<string>();
	const [isMouseOverImg, setIsMouseOverImg] = useState<boolean>(false);

	const getGif = useCallback(async () => {
		if (!title) {
			const trendyGifs = await getTrendingGifs();

			const index = getRandomNumber(0, trendyGifs.length - 1);

			setGifURL(trendyGifs[index].images.original.url);

			return;
		}

		const searchGifs = await getSearchGifs(title);

		if (!searchGifs.length) {
			const trendyGifs = await getTrendingGifs();

			const index = getRandomNumber(0, trendyGifs.length - 1);

			setGifURL(trendyGifs[index].images.original.url);

			return;
		}

		const index = getRandomNumber(0, searchGifs.length - 1);

		setGifURL(searchGifs[index].images.original.url);
	}, [title]);

	useEffect(() => {
		void getGif();
	}, [getGif]);

	return (
		<div className="game-over-container">
			<h1 className="game-over-container-title">Success!</h1>
			{gifURL && (
				<div
					className="game-over-container-image"
					onMouseLeave={() => setIsMouseOverImg(false)}
					onMouseOver={() => setIsMouseOverImg(true)}
				>
					<img src={gifURL} alt={'game over gif'} />
					<button
						onClick={() => {
							void getGif();
						}}
						style={isMouseOverImg ? undefined : { fontSize: 0, height: 0, opacity: 0 }}
					>
						An other one!
					</button>
				</div>
			)}
			<div className="game-over-container-footer">
				<a href="/">Back to quizes</a>
				<button onClick={onRepeatClick}>
					<RepeatIcon />
				</button>
			</div>
		</div>
	);
};
