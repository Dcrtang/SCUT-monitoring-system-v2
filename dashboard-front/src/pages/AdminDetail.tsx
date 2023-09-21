import {
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  colors,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Card,
} from "@mui/material";
import * as uuid from "uuid";
import { useContext, useEffect, useRef, useState } from "react";
import { DataEditor } from "../components/DataEditor";
import { PdfSelector } from "../components/PdfSelector";
import { AutoTextField } from "../components/AutoTextField";
import { InstructionTab } from "../components/EditorTabs/InstructionTab";
import { SensorTab } from "../components/EditorTabs/SensorTab";
import { ProgressTab } from "../components/EditorTabs/ProgressTab";
import { QualityTab } from "../components/EditorTabs/QualityTab";
import { ImageSelector } from "../components/ImageSelector";
import { useNavigate, useParams } from "react-router-dom";
import { checkLogin, useConfig } from "../api";
import { theme } from "../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Login } from "./Login";
export function AdminDetail() {
  const [tab, setTab] = useState(0);
  const { projectId } = useParams();
  const { data: config } = useConfig();
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const navBarRef = useRef<HTMLDivElement>();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;

  useEffect(() => {
    (async () => {
      try {
        await checkLogin();
        setIsLogin(true);
      } catch (error) {
        console.log(error);
        setIsLogin(false);
      }
    })();
  }, []);

  const handleLoginChange = (
    status: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsLogin(status);
  };
  return !isLogin ? (
    <Login onLoginStatusChange={handleLoginChange} />
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Box component="div" ref={navBarRef}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                {"桥梁监控管理平台"}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {/* 使用Box组件来添加固定的菜单列表 */}
          <Box
            sx={{
              width: "10%",
              height: "100%",
              backgroundColor: "#f5f5f5",
              borderColor: "#2B3643",
              display: "flex",
              flexShrink: 0,
            }}
          >
            <List
              disablePadding
              sx={{
                backgroundColor: colors.grey[100],
                height: "100%",
                width: "100%",
              }}
            >
              <ListItem disablePadding sx={{ height: "50px" }}>
                <ListItemButton
                  sx={{ height: "100%", width: "100%" }}
                  onClick={() => {
                    navigator("/admin");
                  }}
                >
                  <ListItemIcon>
                    <ArrowBackIcon></ArrowBackIcon>
                  </ListItemIcon>
                  <ListItemText primary="返回我的项目" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          {/* 将Grid组件放在Box组件内，使其显示在菜单列表的右侧 */}
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ position: "relative" }} padding={"10px"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                  <Tab label="项目详情" />
                  <Tab label="指令下发" />
                  <Tab label="工程进度管理" />
                  <Tab label="工程质量管理" />
                  <Tab label="应力传感器监测" />
                </Tabs>
              </Box>
              {tab === 0 && (
                <>
                  <Typography variant="h6" component="div">
                    项目介绍
                  </Typography>

                  <Card sx={{ margin: "12px 0", padding: "24px" }}>
                    <AutoTextField
                      field={`programs[${programsId}].intro.name`}
                      label="项目名称"
                      fullwidth
                    />
                    <AutoTextField
                      field={`programs[${programsId}].detail.situation`}
                      label="项目概况文本"
                      multiline
                      fullwidth
                    />
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <AutoTextField
                        field={`programs[${programsId}].intro.type`}
                        label="桥梁类型"
                        multiline
                        fullwidth
                      />
                      <Box sx={{ width: "100px" }} />
                      <AutoTextField
                        field={`programs[${programsId}].intro.status`}
                        label="状态"
                        multiline
                        fullwidth
                      />
                      <Box sx={{ width: "100px" }} />
                      <AutoTextField
                        field={`programs[${programsId}].intro.unit`}
                        label="建设单位"
                        multiline
                        fullwidth
                      />
                    
                    </Box>
                    <AutoTextField
                      field={`programs[${programsId}].detail.model.fileId`}
                      label="模型fileID"
                      multiline
                      fullwidth
                    />
                     <AutoTextField
                      field={`programs[${programsId}].detail.model.viewToken`}
                      label="模型token"
                      multiline
                      fullwidth
                    />
                    <Box sx={{ height: "12px" }} />
                  
                    <ImageSelector
                      field={`programs[${programsId}].intro.bridgeImg`}
                      label="项目概况图片"
                    />
                  </Card>
                  <Box sx={{ height: "36px" }} />
                  <DataEditor
                    field={`programs[${programsId}].detail.members`}
                    label="人员组织表格"
                    columns={[
                      {
                        field: "index",
                        headerName: "序号",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "name",
                        headerName: "姓名",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "position",
                        headerName: "职位",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "contactInfo",
                        headerName: "联系方式",
                        editable: true,
                        flex: 1,
                      },
                    ]}
                    generateNewRow={() => ({
                      id: uuid.v4(),
                      index: "占位文本",
                      name: "占位文本",
                      position: "占位文本",
                      contactInfo: "占位文本",
                    })}
                  />
                  <Box sx={{ height: "12px" }} />
                  <DataEditor
                    field={`programs[${programsId}].detail.beamData`}
                    label="主梁单元数据表格"
                    columns={[
                      {
                        field: "index",
                        headerName: "编号",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "long",
                        headerName: "梁长/m",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "width",
                        headerName: "梁宽/m",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "smallMile",
                        headerName: "小里程理论高程/m",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "bigMile",
                        headerName: "大里程理论高程/m",
                        editable: true,
                        flex: 1,
                      },
                    ]}
                    generateNewRow={() => ({
                      id: uuid.v4(),
                      index: "占位文本",
                      long: "占位文本",
                      width: "占位文本",
                      smallMile: "占位文本",
                      bigMile: "占位文本",
                    })}
                  />

                  <DataEditor
                    field={`programs[${programsId}].detail.cableData`}
                    label="斜拉索数据"
                    columns={[
                      {
                        field: "index",
                        headerName: "编号",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "elasticity",
                        headerName: "弹性伸长量/mm",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "vertical",
                        headerName: "垂度修正量/mm",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "length",
                        headerName: "理论索长/mm",
                        editable: true,
                        flex: 1,
                      },
                      {
                        field: "force",
                        headerName: "成桥索力/kN",
                        editable: true,
                        flex: 1,
                      },
                    ]}
                    generateNewRow={() => ({
                      id: uuid.v4(),
                      index: "占位文本",
                      elasticity: "占位文本",
                      vertical: "占位文本",
                      length: "占位文本",
                      force: "占位文本",
                    })}
                  />
                </>
              )}
              {tab === 1 && <InstructionTab />}
              {tab === 2 && <ProgressTab />}
              {tab === 3 && <QualityTab />}
              {tab === 4 && <SensorTab />}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
