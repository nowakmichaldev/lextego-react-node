export interface NasaResponseInterface {
	copyright: string;
	date: string;
	explanation: string;
	hdurl: string;
	media_type: 'image' | 'video' | 'other'; // Assuming it can only be "image", "video", or "other"
	service_version: string;
	title: string;
	url: string;
}
