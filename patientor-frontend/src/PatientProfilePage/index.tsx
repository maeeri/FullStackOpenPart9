import { Patient, IDiagnosis, EntryType, Entry } from "../types";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state/state";
import { useEffect } from "react";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { setPatient, setDiagnoses } from "../state";
import EntryDetails from "./Entry";
import Button from "@material-ui/core/Button";
import AddEntryModal from "../AddEntryModal/index";
import React from "react";
import { addEntry } from "../state";
import { EntryFormValues } from "../AddEntryModal/index";

const PatientProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const [type, setType] = React.useState(EntryType.HealthCheck);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const closeEntryModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const openEntryModal = (type: EntryType) => {
    setType(type);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!patient || patient.id !== id) {
      void fetchPatient();
    }
    if (!diagnoses) {
      void fetchDiagnoses();
    }
  }, []);

  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}` //eslint-disable-line
      );
      dispatch(setPatient(patientFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDiagnoses = async () => {
    try {
      const { data: diagnosesFromApi } = await axios.get<IDiagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnoses(diagnosesFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  const submitEntry = async (values: EntryFormValues) => {

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      
      dispatch(addEntry(newEntry));
      closeEntryModal();
      
    } catch (e) {
      console.log(e);
    }
  };

  let gender;

  if (patient?.gender === "male") {
    gender = <MaleIcon />;
  } else if (patient?.gender === "female") {
    gender = <FemaleIcon />;
  } else {
    gender = <TransgenderIcon />;
  }

  if (patient === undefined || !diagnoses["M24.2"]) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>
        {patient?.name} {gender}{" "}
      </h2>
      <div>
        <div>ssn: {patient?.ssn}</div>
        <div>occupation: {patient?.occupation}</div>
      </div>
      <Button onClick={() => openEntryModal(EntryType.HealthCheck)}>
        add patient health check entry
      </Button>
      <Button onClick={() => openEntryModal(EntryType.Hospital)}>
        add patient hospital entry
      </Button>
      <Button onClick={() => openEntryModal(EntryType.OccupationalHealthcare)}>
        add patient occupational healthcare entry
      </Button>
      <AddEntryModal
        error={error}
        modalOpen={modalOpen}
        type={type}
        onSubmit={submitEntry}
        onClose={closeEntryModal}
      />
      {patient.entries && patient.entries.length > 0 && (
        <div>
          <h4>entries</h4>
          {patient?.entries?.map((e) => {
            return <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />;
          })}
        </div>
      )}
    </div>
  );
};

export default PatientProfilePage;
