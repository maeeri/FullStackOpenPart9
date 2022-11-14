import patientData from '../../data/patients';
import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatientInfo = (): Array<PublicPatient> => {
    return patients;
};

const getSinglePatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatientInfo = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
    const newEntry = {
        id: uuid(),
        ...entry,
    };
    patient.entries?.push(newEntry);
    return newEntry;
};

export default {
    getPatientInfo,
    addPatientInfo,
    getSinglePatient,
    addEntry,
};
