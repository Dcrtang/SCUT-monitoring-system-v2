import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { getFileURL, useConfig } from "../api";
import { useParams } from "react-router-dom";
import PdfViewer from "../components/PdfViewer";

export function Sensor() {
  const { data: config } = useConfig();
  const { projectId } = useParams();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;
  return (
    <>
      <Box sx={{ borderBottom: 2, borderColor: "divider", marginBottom: 1 }}>
        <h1> {config?.programs[programsId]?.sensor.name}</h1>
        <Box sx={{ justifyContent: "center" ,alignItems:"center"}}>
          <PdfViewer
            pdfUrl={getFileURL(config?.programs[programsId]?.sensor.file) || ""}
          />
        </Box>
      </Box>
      {/* <MonitorData index={tab} /> */}
    </>
  );
}
