import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getPatientInfo();
    return res.send(patients);
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatientInfo(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'something went wrong';
        if (error instanceof Error) {
            (errorMessage += ' Error: '), error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
