import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { useConfig } from "../api";
import { useParams } from "react-router-dom";
// import { MonitorData } from "../components/MonitorData";

export function Sensor() {
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  const { projectId } = useParams();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 1 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          {config?.programs[programsId]?.sensor.name}
        </Tabs>
        <div>上传文件</div>
      </Box>
      {/* <MonitorData index={tab} /> */}
    </>
  );
}
