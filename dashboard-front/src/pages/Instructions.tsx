import { Box, Typography } from "@mui/material";
import { getFileURL, useConfig } from "../api";

import { useParams } from "react-router-dom";

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

      {config?.programs[programsId]?.instructions?.map((instruction) => (
        <Box key={instruction.id} marginTop="2%">
          添加file
        </Box>
      ))}
    </Box>
  );
}
