import { Box, Typography } from "@mui/material";
import { getFileURL, useConfig } from "../api";

export function Properties() {
  const { data: config } = useConfig();
  return (
    <Box textAlign="center">
      <Typography variant="h6" component="div" textAlign={"center"}>
        指令属性
      </Typography>
      {config?.instructions?.map((instruction) => (
        <Box key={instruction.id} marginTop="2%">
          <img src={getFileURL(instruction.img)} />
        </Box>
      ))}
    </Box>
  );
}
