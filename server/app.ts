import express from 'express';
import Logger from './loaders/logger';
import config from './config';

async function start() {
    const app = express();

    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, (err) => {
        if (err) {
            Logger.error(err);
            process.exit(1);
        }
        Logger.info(`
            ################################################
            🛡️  Server listening on port: ${config.port} 🛡️ 
            ################################################
        `);
    });
}

start();
