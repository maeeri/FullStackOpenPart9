import HealthRatingBar from "../components/HealthRatingBar";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

// import { useStateValue } from "../state";
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Diagnosis,
  EntryType,
} from "../types";

const entryStyle = {
  border: "1px solid black",
  marginTop: "2%",
  padding: "1%",
  borderRadius: "5px",
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
//eslint-disable
const parseDiagnosis = (diagnosis: unknown) => {
  if (!diagnosis) {
    throw new Error("no such diagnosis in data");
  }
  return diagnosis as Diagnosis;
};

const HealthCheckEntryDetails = ({ entry }: HealthCheckProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <MedicalServicesIcon />{" "}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>seen by {entry.specialist}</div>
      <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
    </div>
  );
};

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>diagnosis by {entry.specialist} </div>
      {entry.discharge.date && (
        <>
          <div>discharged: {entry.discharge.date}</div>
          <div>discharge criteria: {entry.discharge.criteria}</div>
        </>
      )}
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes?.map((d: string) => (
            <li key={d}>
              {d} {parseDiagnosis(diagnoses)?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const OccupationalEntryDetails = ({ entry, diagnoses }: OccupationalProps) => {
  return (
    <div style={entryStyle}>
      <div>
        {entry.date} <WorkIcon />{" "}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <br />
      <div> employer: {entry.employerName}</div>
      <br />
      <div>seen by {entry.specialist} </div>
      {entry.sickLeave && (
        <div>
          sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}{" "}
        </div>
      )}
      <ul>
        {entry.diagnosisCodes?.map((d: string) => (
          <li key={d}>
            {d} {parseDiagnosis(diagnoses)?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EntryDetails = ({ entry, diagnoses }: BaseEntryProps) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

interface EntryProps {
  diagnoses?: { [id: string]: Diagnosis | undefined };
}
interface BaseEntryProps extends EntryProps {
  entry: Entry;
}
interface OccupationalProps extends EntryProps {
  entry: OccupationalHealthcareEntry;
}
interface HealthCheckProps extends EntryProps {
  entry: HealthCheckEntry;
}
interface HospitalProps extends EntryProps {
  entry: HospitalEntry;
}

export default EntryDetails;
