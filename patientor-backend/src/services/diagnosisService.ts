import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

export const getDiagnoses = (): Array<Diagnosis> => {
    return diagnosisData;
};
