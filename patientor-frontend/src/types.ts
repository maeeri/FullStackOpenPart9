export interface IDiagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Diagnosis = IDiagnosis | undefined;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital = "Hospital",
  OccupationalHealthcare = "Occupational Healthcare",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
}

export enum HealthCheckRating {
  "Healthy" = 1,
  "LowRisk" = 2,
  "HighRisk" = 3,
  "CriticalRisk" = 4,
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  diagnosisCodes: Array<IDiagnosis["code"]>;
  discharge?: {
    date?: string;
    criteria?: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  diagnosisCodes?: Array<IDiagnosis["code"]>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
