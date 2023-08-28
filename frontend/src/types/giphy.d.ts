export interface GifObjectInterface {
	type: string; // default: "gif"
	id: string;
	slug: string;
	url: string;
	bitly_url: string;
	embed_url: string;
	username: string;
	source: string;
	rating: string;
	content_url: string;
	user?: any; // Optional, as it may not always be applicable
	source_tld: string;
	source_post_url: string;
	update_datetime: string;
	create_datetime: string;
	import_datetime: string;
	trending_datetime: string;
	images: ImagesInterface;
	title: string;
	alt_text: string;
}

export interface ImagesInterface {
	fixed_height: RenditionInterface;
	fixed_height_still: StillImageInterface;
	fixed_height_downsampled: RenditionInterface;
	fixed_width: RenditionInterface;
	fixed_width_still: StillImageInterface;
	fixed_width_downsampled: RenditionInterface;
	fixed_height_small: RenditionInterface;
	fixed_height_small_still: StillImageInterface;
	fixed_width_small: RenditionInterface;
	fixed_width_small_still: StillImageInterface;
	downsized: DownsizedInterface;
	downsized_still: StillImageInterface;
	downsized_large: DownsizedInterface;
	downsized_medium: DownsizedInterface;
	downsized_small: DownsizedSmallInterface;
	original: OriginalInterface;
	original_still: StillImageInterface;
	looping: LoopingInterface;
	preview: PreviewInterface;
	preview_gif: PreviewGIFInterface;
}

export interface RenditionInterface {
	url: string;
	width: string;
	height: string;
	size: string;
	mp4?: string;
	mp4_size?: string;
	webp?: string;
	webp_size?: string;
}

export interface StillImageInterface {
	url: string;
	width: string;
	height: string;
	size?: string;
}

export interface DownsizedInterface {
	url: string;
	width: string;
	height: string;
	size: string;
}

export interface DownsizedSmallInterface {
	mp4: string;
	width: string;
	height: string;
	mp4_size: string;
}

export interface OriginalInterface {
	url: string;
	width: string;
	height: string;
	size: string;
	frames: string;
	mp4: string;
	mp4_size: string;
	webp: string;
	webp_size: string;
}

export interface LoopingInterface {
	mp4: string;
	mp4_size?: string;
}

export interface PreviewInterface {
	mp4: string;
	mp4_size: string;
	width: string;
	height: string;
}

export interface PreviewGIFInterface {
	url: string;
	width: string;
	height: string;
	size?: string;
}
