import { NewPatient } from './types';

enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseString = (field: string, text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error(`incorrect or missing ${field}`);
    }

    return text;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('incorrect or missing gender: ' + gender);
    }
    return gender;
};

type Fields = { name: unknown; ssn: unknown; dateOfBirth: unknown; occupation: unknown; gender: unknown };

const toNewPatient = ({ name, ssn, dateOfBirth, occupation, gender }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString('name', name),
        ssn: parseString('social security number', ssn),
        dateOfBirth: parseString('date of birth', dateOfBirth),
        occupation: parseString('occupation', occupation),
        gender: parseGender(gender),
    };

    return newPatient;
};

export default toNewPatient;
