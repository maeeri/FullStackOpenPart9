import React, { useState } from "react";
import { ErrorMessage, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import { Diagnosis } from "../types";
import { InputLabel } from "@material-ui/core";
import Input from "@material-ui/core/Input";
/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  const [value, setValue] = useState<number>();

  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value === undefined) return;
          if (value > max) setValue(max);
          else if (value <= min) setValue(min);
          else setValue(Math.floor(value));
        }}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true, true);
    setFieldValue(field, selectedDiagnoses);
  };

  const stateOptions = diagnoses.map((diagnosis) => {
    if (diagnosis) {
      return {
        key: diagnosis?.code,
        text: `${diagnosis.name} (${diagnosis.code})`,
        value: diagnosis?.code,
      };
    }
  });

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        id="test"
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option?.key} value={option?.value}>
            {option?.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
