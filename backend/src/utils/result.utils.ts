export class Result<T = unknown> {
	public isSuccess: boolean;
	public isFailure: boolean;
	public error!: string | null;
	private _status: number;
	private readonly _value!: T;

	private constructor(isSuccess: boolean, error?: string | null, value?: T | null, status?: number) {
		if (isSuccess && error) {
			throw new Error(`InvalidOperation: A result cannot be 
        successful and contain an error`);
		}
		if (!isSuccess && !error) {
			throw new Error(`InvalidOperation: A failing result 
        needs to contain an error message`);
		}
		this.isSuccess = isSuccess;
		this.isFailure = !isSuccess;
		if (error) {
			this.error = error;
		}

		if (value) {
			this._value = value;
		}
		this._status = status ? status : 200;
		Object.freeze(this);
	}

	get status(): number {
		return this._status;
	}

	set status(value: number) {
		this._status = value;
	}

	public static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, null, value);
	}

	public static fail<U>(error: string, status?: number): Result<U> {
		console.error(error);

		if (status) {
			return new Result<U>(false, error, null, status);
		} else {
			return new Result<U>(false, error);
		}
	}

	public getValue(): T {
		if (!this.isSuccess) {
			throw new Error(`Cant retrieve the value from a failed result.`);
		}
		return this._value;
	}
}
