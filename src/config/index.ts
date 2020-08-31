declare const process;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const apiUrl = 'http://localhost:8080';

export default {
    apiUrl,

    auth: {
        google: {
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            projectId: process.env.GOOGLE_OAUTH_PROJECT_ID,
            TEST: process.env.TEST,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            authUri: 'https://accounts.google.com/o/oauth2/auth',
            tokenUri: 'https://oauth2.googleapis.com/token',
            authProviderCertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
            redirectUri: `${apiUrl}/auth-callback`,
            scopes: [''],
        },
    },
};
