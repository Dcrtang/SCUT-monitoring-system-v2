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
import { useParams } from "react-router-dom";

export function Intro() {
  const { projectId } = useParams();
 
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
 
  
  // const targetProgram = config?.programs.find(program => program.id === projectId); // 找到目标 program 对象
  // const programsId = config?.programs.findIndex(program => program.id === projectId) || 0;
 // 找到目标 program 对象在数组中的索引位置
  const programsId=0;
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="项目概况" />
          <Tab label="人员组织" />
          <Tab label="主梁数据" />
          <Tab label="斜拉索数据" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <>
          <Text>{config?.programs[programsId]?.detail?.situation}</Text>
          <Box sx={{ height: "5%" }} />
          <div>model</div>
        </>
      )}
      {tab === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>姓名</TableCell>
                <TableCell>职位</TableCell>
                <TableCell>联系方式</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {config?.programs[programsId]?.detail.members.map((member) => (
                <TableRow key={member.name}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.postion}</TableCell>
                  <TableCell>{member.contactInfo}</TableCell>
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
                  <TableCell>编号</TableCell>
                  <TableCell>梁长/m</TableCell>
                  <TableCell>梁宽/m</TableCell>
                  <TableCell>小里程理论高程/m</TableCell>
                  <TableCell>大里程理论高程/m⁴</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {config?.programs[programsId]?.detail.beamData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.long}</TableCell>
                    <TableCell>{data.width}</TableCell>
                    <TableCell>{data.width}</TableCell>
                    <TableCell>{data.smallMile}</TableCell>
                    <TableCell>{data.bigMile}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
       
        </Box>
      )}
      {tab === 3 && (
        <Box sx={{ textAlign: "center" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>编号</TableCell>
                  <TableCell>弹性伸长量/mm</TableCell>
                  <TableCell>垂度修正量/mm</TableCell>
                  <TableCell>理论索长/mm</TableCell>
                  <TableCell>成桥索力/kN</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {config?.programs[programsId]?.detail.cableData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.elasticity}</TableCell>
                    <TableCell>{data.vertical}</TableCell>
                    <TableCell>{data.length}</TableCell>
                    <TableCell>{data.force}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
       
        </Box>
      )}
    </>
  );
}
