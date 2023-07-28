import { Box, Button, Card, colors, Snackbar } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { setConfig, useConfig } from "../../api";
import { Config } from "../../types";
import { PdfSelector } from "../PdfSelector";
import * as uuid from "uuid";
import { AutoTextField } from "../AutoTextField";

export function SensorTab() {
  const { data: config, refetch } = useConfig();
  const [message, setMessage] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setConfigMutation = useMutation(setConfig);
  const programsId = 0;
  return (
    <Box sx={{ marginTop: "12px" }}>
      <AutoTextField
        field="programs[0].sensor.name"
        label="传感器名称"
        multiline
        fullwidth
      />
      <PdfSelector field="programs[0].sensor.file" label="应力传感器文件" />
    </Box>
  );
}
