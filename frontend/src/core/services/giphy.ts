import { GifObjectInterface } from '../../types/giphy';

const APIKEY = 'Kgg1r5cil1CixQaRM97vzS9sxOl22QSp';
const LIST_LIMIT = 10;
const GIFFY_TRENDING_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=${LIST_LIMIT}`;
const GIFFY_SEARCH_URL = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${LIST_LIMIT}&q=`;

export const getTrendingGifs = async (): Promise<GifObjectInterface[]> => {
	const response = await fetch(GIFFY_TRENDING_URL);
	const { data } = await response.json();

	return data;
};

export const getSearchGifs = async (searchTerm: string): Promise<GifObjectInterface[]> => {
	const response = await fetch(`${GIFFY_SEARCH_URL}${searchTerm}`);
	const { data } = await response.json();

	return data;
};
