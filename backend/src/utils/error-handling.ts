import { MongoError } from 'mongodb';
import { Error } from 'mongoose';

export class ErrorHandling {
	public static dbErrors(errors: Error | MongoError): string {
		if (errors instanceof Error.ValidationError) {
			const keys = Object.keys(errors.errors);
			return `Please verify your ${keys[0]}`;
		} else if (errors instanceof MongoError) {
			if (errors.code === 11000) {
				console.error(JSON.stringify(errors));
				// const keys = Object.keys(errors['keyValue']);
				return `The {keys[0]} you entered is already taken`;
			} else {
				return `${errors.errmsg}`;
			}
		}
		return errors.message;
	}
}
