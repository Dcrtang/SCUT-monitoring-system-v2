import {
  Box,
  Tabs,
  Tab,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors,
} from "@mui/material";
import { useState } from "react";
import { getFileURL, useConfig } from "../api";
import { Text } from "../components/Text";

export function Quality() {
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  const programsId=0
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="梁长" />
          <Tab label="梁宽" />
        
        </Tabs>
      </Box>
      {tab === 0 && (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
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
              {/* <TableBody>
                {config?.report[step]?.length.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.factLeft}</TableCell>
                    <TableCell align="center">{row.factMid}</TableCell>
                    <TableCell align="center">{row.factRight}</TableCell>
                    <TableCell align="center">{row.theoryLeft}</TableCell>
                    <TableCell align="center">{row.theoryMid}</TableCell>
                    <TableCell align="center">{row.theoryRight}</TableCell>
                    <TableCell align="center">{row.errorLeft}</TableCell>
                    <TableCell align="center">{row.errorMid}</TableCell>
                    <TableCell align="center">{row.errorRight}</TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </TableContainer>
          <Box sx={{ height: "8%" }} />
          {/* <img
            src={getFileURL(config?.report[step]?.lengthImg)}
            style={{ marginTop: "36px", display: "block", margin: "auto" }}
          /> */}
        </>
      )}
      {tab === 1 && (
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
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
              {/* <TableBody>
                {config?.report[step]?.width.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.factLeft}</TableCell>
                    <TableCell align="center">{row.factMid}</TableCell>
                    <TableCell align="center">{row.factRight}</TableCell>
                    <TableCell align="center">{row.theoryLeft}</TableCell>
                    <TableCell align="center">{row.theoryMid}</TableCell>
                    <TableCell align="center">{row.theoryRight}</TableCell>
                    <TableCell align="center">{row.errorLeft}</TableCell>
                    <TableCell align="center">{row.errorMid}</TableCell>
                    <TableCell align="center">{row.errorRight}</TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </TableContainer>
          <Box sx={{ height: "8%" }} />
          
        </>
      )}
     
  
    </>
  );
}
