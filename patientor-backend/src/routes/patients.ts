import express from 'express';
import patientService from '../services/patientService';
import { EntryType } from '../types';
import { toNewPatient, toHealthCheckEntry, toHospitalEntry, toOccupationalHealthcareEntry } from '../utils';

const router = express.Router();

const setErrorMessage = (error: unknown) => {
    let errorMessage = 'something went wrong';
    if (error instanceof Error) {
        (errorMessage += ' Error: '), error.message;
    }
    return errorMessage;
};

router.get('/', (_req, res) => {
    const patients = patientService.getPatientInfo();
    return res.send(patients);
});

router.get('/:id', (req, res) => {
    const patient = patientService.getSinglePatient(req.params.id);
    patient ? res.json(patient) : res.sendStatus(404);
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatientInfo(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        res.status(400).send(setErrorMessage(error));
    }
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getSinglePatient(id);

    let newEntry;
    try {
        if (req.body && req.body.type === EntryType.HealthCheck) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            newEntry = toHealthCheckEntry(req.body);
        } else if (req.body && req.body.type === EntryType.OccupationalHealthcare) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            newEntry = toOccupationalHealthcareEntry(req.body);
        } else if (req.body && req.body.type === EntryType.Hospital) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            newEntry = toHospitalEntry(req.body);
        }
    } catch (error: unknown) {
        console.log(error);
        res.status(400).send(setErrorMessage(error));
    }

    if (!patient || !newEntry) {
        throw new Error(!patient ? 'patient not found' : 'invalid entry');
    }

    const response = patientService.addEntry(patient, newEntry);

    res.status(201).send(response);
});

export default router;
