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
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { getFileURL, useConfig } from "../api";
import { Text } from "../components/Text";
import { useParams } from "react-router-dom";
import LocalPageComponent from "../components/LocalPageComponent";



export function Intro() {
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  const { projectId } = useParams();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;

  // 找到目标 program 对象在数组中的索引位置

  return (
    <>
      <div style={{ display: "flex" }}>
        <Box padding={"5px"}>
          <img
            src={getFileURL(config?.programs[programsId]?.intro.bridgeImg)}
            alt="你好"
            height={"100px"}
          />
        </Box>
        <Box padding={"5px"}>
          <List dense>
            <ListItem disablePadding sx={{ paddingLeft: 0 }}>
              <ListItemIcon>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  桥梁类型：
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={config?.programs[programsId]?.intro.type}
                primaryTypographyProps={{
                  variant: "body2",
                  sx: { fontSize: 12 },
                }}
              />
            </ListItem>
            <ListItem disablePadding sx={{ paddingLeft: 0 }}>
              <ListItemIcon>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  状态：
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={config?.programs[programsId]?.intro.status}
                primaryTypographyProps={{
                  variant: "body2",
                  sx: { fontSize: 12 },
                }}
              />
            </ListItem>
            <ListItem disablePadding sx={{ paddingLeft: 0 }}>
              <ListItemIcon>
                <Typography variant="body2" sx={{ fontSize: 12 }}>
                  建设单位：
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={config?.programs[programsId]?.intro.unit}
                primaryTypographyProps={{
                  variant: "body2",
                  sx: { fontSize: 12 },
                }}
              />
            </ListItem>
          </List>
        </Box>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
       
       
          <LocalPageComponent parameter={config?.programs[programsId]?.detail?.model.viewToken||" "}></LocalPageComponent>
     
        </>
      )}
      {tab === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>序号</TableCell>
                <TableCell>姓名</TableCell>
                <TableCell>职位</TableCell>
                <TableCell>联系方式</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {config?.programs[programsId]?.detail.members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.index}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
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
                {config?.programs[programsId]?.detail.beamData.map(
                  (data, id) => (
                    <TableRow key={id}>
                      <TableCell>{data.index}</TableCell>
                      <TableCell>{data.long}</TableCell>
                      <TableCell>{data.width}</TableCell>
                      <TableCell>{data.smallMile}</TableCell>
                      <TableCell>{data.bigMile}</TableCell>
                    </TableRow>
                  )
                )}
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
                {config?.programs[programsId]?.detail.cableData.map(
                  (data, id) => (
                    <TableRow key={id}>
                      <TableCell>{data.index}</TableCell>
                      <TableCell>{data.elasticity}</TableCell>
                      <TableCell>{data.vertical}</TableCell>
                      <TableCell>{data.length}</TableCell>
                      <TableCell>{data.force}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}
