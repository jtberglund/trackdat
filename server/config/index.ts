import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port: parseInt(process.env.PORT, 10) || 8080,

    database: {
        url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@trackdat.74wur.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        name: process.env.DB_NAME,
    },

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,

    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
};
