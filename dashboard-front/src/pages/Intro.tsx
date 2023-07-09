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

export function Intro() {
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="项目概况" />
          <Tab label="人员组织" />
          <Tab label="主梁单元数据" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <>
          <Text>{config?.intro.text}</Text>
          <Box sx={{ height: "5%" }} />
          <img src={getFileURL(config?.intro.img)} style={{display: "block", margin: "auto" }} />
        </>
      )}
      {tab === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>姓名</TableCell>
                <TableCell>执业或职业资格证书名称</TableCell>
                <TableCell>拟在本项目工程任职</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {config?.intro.members.map((member) => (
                <TableRow key={member.name}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.cert}</TableCell>
                  <TableCell>{member.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {tab === 2 && (
        <Box sx={{ textAlign: "center" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>主梁类型</TableCell>
                  <TableCell>主梁面积/m²</TableCell>
                  <TableCell>抗弯惯性矩/m⁴</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {config?.intro.unitData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.type}</TableCell>
                    <TableCell>{data.area}</TableCell>
                    <TableCell>{data.moment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <img
            style={{ marginTop: "5%" }}
            src={getFileURL(config?.intro.bridgeImg)}
          ></img>
        </Box>
      )}
    </>
  );
}
