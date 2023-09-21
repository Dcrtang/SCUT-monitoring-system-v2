import {
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { getFileURL, useConfig } from "../api";
import { useParams } from "react-router-dom";
import PdfViewer from "../components/PdfViewer";

export function Quality() {
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  const { projectId } = useParams();
  const [step, setStep] = useState(0);
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
          {config?.programs[programsId]?.quality?.map((item, index) => (
            <MenuItem key={item.id} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="安装标高验收" />
          <Tab label="斜拉索索力验收" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <>
          <PdfViewer
            pdfUrl={
              getFileURL(
                config?.programs[programsId]?.quality[step]?.elevation.file
              ) || ""
            }
          />
          {config?.programs[programsId]?.quality[step]?.elevation.file}
    
        </>
      )}
      {tab === 1 && (
        <>
          <PdfViewer
            pdfUrl={
              getFileURL(
                config?.programs[programsId]?.quality[step]?.cableForce.file
              ) || ""
            }
          />
          {config?.programs[programsId]?.quality[step]?.cableForce.file}

        
        </>
      )}
    </>
  );
}
