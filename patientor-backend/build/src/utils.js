"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gender;
(function (Gender) {
    Gender["Female"] = "female";
    Gender["Male"] = "male";
    Gender["Other"] = "other";
})(Gender || (Gender = {}));
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};
const parseString = (field, text) => {
    if (!text || !isString(text)) {
        throw new Error(`incorrect or missing ${field}`);
    }
    return text;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('incorrect or missing gender: ' + gender);
    }
    return gender;
};
const toNewPatient = ({ name, ssn, dateOfBirth, occupation, gender }) => {
    const newPatient = {
        name: parseString('name', name),
        ssn: parseString('social security number', ssn),
        dateOfBirth: parseString('date of birth', dateOfBirth),
        occupation: parseString('occupation', occupation),
        gender: parseGender(gender),
    };
    return newPatient;
};
exports.default = toNewPatient;
