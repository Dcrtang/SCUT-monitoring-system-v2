import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { Text } from "../components/Text";
import { getFileURL, useConfig } from "../api";
import { useParams } from "react-router-dom";
import LocalPageComponent from "../components/LocalPageComponent";

export function Progress() {
  const [step, setStep] = useState(0);
  const { data: config } = useConfig();
  const { projectId } = useParams();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;
  // alert(config?.programs[programsId]?.progress);
  return (
    <>
      <FormControl>
        <InputLabel id="step-select-label">请选择</InputLabel>
        <Select
          sx={{ width: "300px" }}
          labelId="step-select-label"
          label="请选择工序"
          value={step}
          onChange={(e) => {
            setStep(+e.target.value);
          }}
          id="my-select"
        >
          {config?.programs[programsId]?.progress?.map((item, index) => (
            <MenuItem key={item.id} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box width="100%" height="100%">      
        <LocalPageComponent parameter={config?.programs[programsId]?.progress[step]?.model||" "}></LocalPageComponent>
      </Box>
    </>
  );
}
