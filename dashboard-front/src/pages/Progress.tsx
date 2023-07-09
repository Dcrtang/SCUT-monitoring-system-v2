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

export function Progress() {
  const [step, setStep] = useState(0);
  const { data: config } = useConfig();
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
          {config?.progress?.map((item, index) => (
            <MenuItem key={item.id} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Text>{config?.progress[step]?.text}</Text>
        <img alt="" src={getFileURL(config?.progress[step]?.img)}  style={{ marginTop: "5%", display: "block", margin: "auto" }} />
      </Box>
    </>
  );
}
