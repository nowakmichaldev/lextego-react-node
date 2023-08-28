import { NasaResponseInterface } from '../../types/nasa';

const URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

export const getNasaImage = async (): Promise<NasaResponseInterface> => {
	const response = await fetch(URL);
	return await response.json();
};
