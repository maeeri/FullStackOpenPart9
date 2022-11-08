import patientData from '../../data/patients';
import { Patient, NewPatient, ReturnPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatientInfo = (): Array<ReturnPatient> => {
    return patients;
};

const addPatientInfo = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatientInfo,
    addPatientInfo,
};
