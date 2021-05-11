import * as R from 'ramda';

const isType = R.curry((type, value) => R.type(value) === type);
const typeMessage = (type, field) => `${field} has to be a ${type}`;
const typeRule = (type) => [
    isType(type),
    (val, field) => typeMessage(type, field),
];
const isString = typeRule('String');

const normalize = (spec, input) => {
    return {
        ...input,
        ...Object.keys(spec).reduce(
            (acc, x) => R.assoc(x, R.propOr(null, x, input), acc),
            {}
        ),
    };
};

const isValidCarrier = () => false;

const validate = (spec: {}, input: {}) => {
    const normalizedInput = normalize(spec, input);
    return R.reduce(
        (result, key) => {
            const value = input[key];
            const predicates = Array.isArray(spec[key])
                ? spec[key]
                : [spec[key]];
            return null; // TODO
        },
        {},
        Object.keys(normalizedInput)
    );
};
