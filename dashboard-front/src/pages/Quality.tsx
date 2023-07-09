import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getFileURL, useConfig } from "../api";

export function Quality() {
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  return (
    <>
      <FormControl>
        <InputLabel id="step-select-label">请选择</InputLabel>
        <Select
          labelId="step-select-label"
          label="请选择"
          sx={{ width: "300px" }}
          value={tab}
          onChange={(e) => {
            setTab(+e.target.value);
          }}
        >
          {config?.quality?.map((item, index) => (
            <MenuItem key={item.id} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box textAlign="center">
        <Typography
          variant="h6"
          component="div"
          textAlign={"center"}
          margin={"3% 0 1% 0"}
        >
          工程质量管理
        </Typography>
        <Box marginBottom="24px">
          <img src={getFileURL(config?.quality[tab]?.img1)} />
        </Box>
        <Typography
          variant="h6"
          component="div"
          textAlign={"center"}
          margin={"3% 0 1% 0"}
        >
          工程质量管理图
        </Typography>
        <Box>
          <img src={getFileURL(config?.quality[tab]?.img2)} />
        </Box>
      </Box>
    </>
  );
}
