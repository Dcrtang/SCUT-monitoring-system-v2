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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { getFileURL, useConfig } from "../api";
import { Text } from "../components/Text";

export function Report() {
  const [tab, setTab] = useState(0);
  const [step, setStep] = useState(0);
  const { data: config } = useConfig();
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
          {config?.report.map((item, index) => (
            <MenuItem key={item.id} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ height: "1%" }} />
      <Typography
        // variant="h6"
        component="div"
        textAlign="left"
        margin={"24px 0 6px 0"}
      >
        描述文本
      </Typography>
      <Text>{config?.report[step]?.description}</Text>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="梁长" />
          <Tab label="梁宽" />
          <Tab label="横坡" />
          <Tab label="纵坡" />
        </Tabs>
      </Box>
      {tab === 0 && (
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
              <TableBody>
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
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ height: "8%" }} />
          <img
            src={getFileURL(config?.report[step]?.lengthImg)}
            style={{ marginTop: "36px", display: "block", margin: "auto" }}
          />
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
              <TableBody>
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
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ height: "8%" }} />
          <img
            src={getFileURL(config?.report[step]?.widthImg)}
            style={{ marginTop: "36px", display: "block", margin: "auto" }}
          />
        </>
      )}
      {tab === 2 && (
        <>
          <Box sx={{ height: "8%" }} />
          <img
            src={getFileURL(config?.report[step]?.hengImg)}
            style={{ marginTop: "36px", display: "block", margin: "auto" }}
          />
        </>
      )}
      {tab === 3 && (
        <>
          <Box sx={{ height: "8%" }} />
          <img
            src={getFileURL(config?.report[step]?.zongImg)}
            style={{ marginTop: "36px", display: "block", margin: "auto" }}
          />
        </>
      )}
    </>
  );
}
