"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = patientService_1.default.getPatientInfo();
    return res.send(patients);
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatientInfo(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'something went wrong';
        if (error instanceof Error) {
            (errorMessage += ' Error: '), error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
