import mongoose from 'mongoose';
import config from '../config';
import type { Db } from 'mongodb';
import Logger from './logger';
import { Result } from 'true-myth';

export default async (): Promise<Result<Db, any>> => {
    return mongoose
        .connect(config.database.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(({ connection }) => {
            connection.on('error', (...args) => {
                Logger.error('database error:', ...args);
            });
            return Result.ok(connection.db);
        })
        .catch((...e) => {
            Logger.error('connection error:', ...e);
            return Result.err(e);
        });
};
