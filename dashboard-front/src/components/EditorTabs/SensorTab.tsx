import { Box, Button, Card, colors, Snackbar } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { setConfig, useConfig } from "../../api";
import { Config } from "../../types";
import { PdfSelector } from "../PdfSelector";
import * as uuid from "uuid";
import { AutoTextField } from "../AutoTextField";
import { UploadPdf } from "../UploadPdf";
import { useParams } from "react-router-dom";

export function SensorTab() {
  const { data: config, refetch } = useConfig();
  const [message, setMessage] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setConfigMutation = useMutation(setConfig);
  const { projectId } = useParams();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;
  return (

    <Card sx={{ margin: "12px 0", padding: "24px" }}>
      <AutoTextField
        field={`programs[${programsId}].sensor.name`}
        label="传感器名称"
        multiline
        fullwidth
      />
      <UploadPdf field={`programs[${programsId}].sensor.file`} label="应力传感器文件" />
      
    </Card>
    
  );
}
