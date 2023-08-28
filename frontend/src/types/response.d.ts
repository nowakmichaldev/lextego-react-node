export interface ResponseInterface<T = unknown> {
	message?: string;
	success: boolean;
	body?: T;
}
