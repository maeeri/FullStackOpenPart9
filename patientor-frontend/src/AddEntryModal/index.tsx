import HealthCheckForm from "./HealthCheckForm";
import OccupationalForm from "./OccupationalEntryForm";
import { Entry, EntryType } from "../types";
import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import HospitalEntryForm from "./HospitalEntryForm";

  // Define special omit for unions
  export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
  // Define Entry without the 'id' property
  export type EntryFormValues = UnionOmit<Entry, "id">;

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryFormValues) => void;
  onClose: () => void;
  error: string;
  type: EntryType;
}

const AddEntryModal = ({
  modalOpen,
  error,
  onClose,
  type,
  onSubmit,
}: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
        {type === EntryType.HealthCheck && (
          <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
        )}
        {type === EntryType.Hospital && (
          <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        )}
        {type === EntryType.OccupationalHealthcare && (
          <OccupationalForm onSubmit={onSubmit} onCancel={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
