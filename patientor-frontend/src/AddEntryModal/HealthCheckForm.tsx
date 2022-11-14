import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { EntryType, HealthCheckEntry, HealthCheckRating } from "../types";
import {
  TextField,
  SelectField,
  HealthCheckRatingOption,
} from "../AddPatientModal/FormField";

//common base values for all entryforms
export const baseValues = {
  description: "",
  date: "",
  specialist: "",
};


const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" },
];

type HealthCheckFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}

const HealthCheckForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        ...baseValues,
        type: EntryType.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
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
        if (!values.healthCheckRating) {
          console.log(values.healthCheckRating);
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
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
            <SelectField
              name="healthCheckRating"
              label="Health check rating"
              options={healthCheckRatingOptions}
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

export default HealthCheckForm;
