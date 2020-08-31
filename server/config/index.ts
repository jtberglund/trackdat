import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const port = parseInt(process.env.PORT, 10) || 8080;
const baseUrl = `http://localhost:${port}`;

export default {
    port: port,
    baseUrl,

    database: {
        url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@trackdat.74wur.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        name: process.env.DB_NAME,
    },

    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },

    api: {
        prefix: '/api',
    },

    auth: {
        jwtSecret: process.env.JWT_SECRET,
        google: {
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            projectId: process.env.GOOGLE_OAUTH_PROJECT_ID,
            authUri: 'https://accounts.google.com/o/oauth2/auth',
            tokenUri: 'https://oauth2.googleapis.com/token',
            authProviderCertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            redirectUri: `${baseUrl}/auth-callback`,
            scopes: [''],
        },
    },
};
