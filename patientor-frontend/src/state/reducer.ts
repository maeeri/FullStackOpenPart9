import { State } from "./state";
import { Patient, IDiagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      data: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      data: Patient;
    }
  | {
      type: "SET_PATIENT";
      data: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      data: IDiagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      data: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.data.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.data.id]: action.data,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.data,
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.data.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_ENTRY":
      if (state.patient) {
        state.patient.entries.push(action.data);
      }
      return {
        ...state,
      };

    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", data: patients };
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", data: newPatient };
};

export const setPatient = (patient: Patient): Action => {
  return { type: "SET_PATIENT", data: patient };
};

export const setDiagnoses = (diagnoses: IDiagnosis[]): Action => {
  return { type: "SET_DIAGNOSES", data: diagnoses };
};

export const addEntry = (newEntry: Entry): Action => {
  return { type: "ADD_ENTRY", data: newEntry };
};
