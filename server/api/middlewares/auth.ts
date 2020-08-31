import jwt from 'express-jwt';
import config from '../../config';
import { prop, pipe, split } from 'ramda';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { IncomingHttpHeaders } from 'http';

type RequestObject = Request<ParamsDictionary, any, any, ParsedQs>;

/**
 * Split the auth header by space
 *
 * e.g. 'Token 1234' => ['Token', '1234']
 */
const getAuthHeaderParts = pipe<
    RequestObject,
    IncomingHttpHeaders,
    string,
    string[]
>(prop('headers'), prop('authorization'), split(' '));

const getTokenFromHeader = (req: RequestObject) => {
    const authIdentifier = getAuthHeaderParts(req);

    if (authIdentifier[0] === 'Token' || authIdentifier[0] === 'Bearer') {
        return authIdentifier[1];
    }
    return null;
};

const isAuth = jwt({
    secret: config.auth.jwtSecret, // The _secret_ to sign the JWTs
    userProperty: 'token', // Use req.token to store the JWT
    getToken: getTokenFromHeader, // How to extract the JWT from the request
});

export default isAuth;
