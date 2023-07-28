import { Box, Typography } from "@mui/material";
import { getFileURL, useConfig } from "../api";
import { useParams } from "react-router-dom";
import  PdfViewer  from "../components/PdfViewer";


export function Instructions() {
  const { data: config } = useConfig();
  const { projectId } = useParams();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;
  return (
    <Box textAlign="center">
      <Typography variant="h6" component="div" textAlign={"center"}>
        指令属性
      </Typography>
      <PdfViewer pdfUrl="../../demo.pdf"/>
      {config?.programs[programsId]?.instructions?.map((instruction) => (
        <Box  textAlign="center" key={instruction.id} marginTop="2%">
          <PdfViewer pdfUrl="../../demo.pdf"/>
        </Box>
      ))}
    </Box>
  );
}
