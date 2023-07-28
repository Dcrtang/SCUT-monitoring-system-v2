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
          <Tab label="梁长" />
          <Tab label="梁宽" />
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
          {/* <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" rowSpan={2} colSpan={2}>
                    点号
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                  实测高程 
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                  实测高程(m) 
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                  设计高程(m)
                  </TableCell>
                  <TableCell align="center" colSpan={2}>
                  差值(m)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">左</TableCell>
                  <TableCell align="center">右</TableCell>
                  <TableCell align="center">左</TableCell>
                  <TableCell align="center">右</TableCell>
                  <TableCell align="center">模型标高</TableCell>
                  <TableCell align="center">测点位置</TableCell>
                  <TableCell align="center">左</TableCell>
                  <TableCell align="center">右</TableCell>
                </TableRow>
              </TableHead>
           
            </Table>
          </TableContainer>
          <Box sx={{ height: "8%" }} /> */}
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

          {/* <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" rowSpan={2} colSpan={1}>
                    梁段号
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    实测间距/mm
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    理论间距/mm
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    误差/mm
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">左</TableCell>
                  <TableCell align="center">中</TableCell>
                  <TableCell align="center">右</TableCell>
                  <TableCell align="center">左</TableCell>
                  <TableCell align="center">中</TableCell>
                  <TableCell align="center">右</TableCell>
                  <TableCell align="center">左</TableCell>
                  <TableCell align="center">中</TableCell>
                  <TableCell align="center">右</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <Box sx={{ height: "8%" }} /> */}
        </>
      )}
    </>
  );
}
