import { urlencoded, json } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import { config } from 'dotenv';
import express, { Express } from 'express';
import { connect } from 'mongoose';

import api from './api';
import { QuizesDefaultData } from './db/default-data.db';
import { initializeDatabase } from './db/init.db';

// loading environment file <.env>
config();

const options: CorsOptions = {
	allowedHeaders: [
		'Origin',
		'X-Requested-With',
		'Content-Type',
		'Accept',
		'X-Access-Token',
		'Authorization',
		'x-client-language'
	],
	credentials: true,
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: '*'
};

const app: Express = express() as Express;
const { PORT, MONGO_URL } = process.env;
const DB_URL: string = MONGO_URL;
const port: number = +PORT;

const initServer = async () => {
	await connect(DB_URL);
	// initLocations();

	app.use(cors(options));
	app.use(cookieParser());
	app.use(compression({ level: 9 }));
	app.use(urlencoded({ extended: false }));
	app.use(json());
	app.use('/api', api);

	app.listen(port, '0.0.0.0', () => {
		console.log(`server started at 0.0.0.0:${port}`);
	});
};

initServer()
	.then(async () => {
		await initializeDatabase(QuizesDefaultData);

		console.log('started the server!');
	})
	.catch((e) => {
		console.error(e);
	});
