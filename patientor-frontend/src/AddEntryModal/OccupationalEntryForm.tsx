import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { EntryType, OccupationalHealthcareEntry } from "../types";
import { DiagnosisSelection } from "./FormField";
//base initial values imported from HealthCheckForm
import { baseValues } from "./HealthCheckForm";
import { TextField } from "../AddPatientModal/FormField";

import { useStateValue } from "../state";



type OccupationalFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalFormValues) => void;
  onCancel: () => void;
}

const OccupationalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        ...baseValues,
        type: EntryType.OccupationalHealthcare,
        employerName: "",
        diagnosisCodes: [""],
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sickleave start date"
              placeholder="Sickleave start date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sickleave end date"
              placeholder="Sickleave end date"
              name="sickLeave.endDate"
              component={TextField}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalForm;
