import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { getFileURL, useConfig } from "../api";
import { useParams } from "react-router-dom";
import PdfViewer from "../components/PdfViewer";
import { useState } from "react";

export function Instructions() {
  const [step, setStep] = useState(0);
  const { data: config } = useConfig();
  const { projectId } = useParams();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;
  return (
    <>
      <FormControl>
        <InputLabel id="step-select-label">请选择</InputLabel>
        <Select
          sx={{ width: "300px" }}
          labelId="step-select-label"
          label="请选择"
          value={step}
          onChange={(e) => {
            setStep(+e.target.value);
          }}
        >
          {config?.programs[programsId]?.instructions?.map((item, index) => (
            <MenuItem key={item.id} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <PdfViewer
          pdfUrl={
            getFileURL(
              config?.programs[programsId]?.instructions[step]?.file
            ) || ""
          }
        />
      </Box>
    </>
  );
}
