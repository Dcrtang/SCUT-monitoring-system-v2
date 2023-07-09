import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { useConfig } from "../api";
import { MonitorData } from "../components/MonitorData";

export function Monitor() {
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 1 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          {config?.monitingData.map(({id, name})=><Tab key={id} label={name} />)}
        </Tabs>
      </Box>
      <MonitorData index={tab} />
    </>
  );
}
