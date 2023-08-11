import {
  Box,
  Tabs,
  Tab,
  Button,
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  ListItem,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  colors,
  Typography,
  Card,
} from "@mui/material";
import * as uuid from "uuid";
import { createContext, useEffect, useRef, useState } from "react";
import { checkLogin, getFileURL, reset, setConfig, useConfig } from "../api";
import { useMutation } from "react-query";
import { QualityTab } from "../components/EditorTabs/QualityTab";
import { Login } from "./Login";
import { Link, useNavigate } from "react-router-dom";
import { theme } from "../constants";
import { ListOutlined, Visibility } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { Config } from "../types";
import _ from "lodash";
export function Admin() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();
  const { data: config, refetch } = useConfig();
  const [message, setMessage] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setConfigMutation = useMutation(setConfig);
  const navBarRef = useRef<HTMLDivElement>();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await checkLogin();
        setIsLogin(true);
      } catch (error) {
        console.log(error);
        setIsLogin(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const resetMutation = useMutation(reset);

  const handleLoginChange = (
    status: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsLogin(status);
  };
  console.log(isLogin, isLoading);
  if (isLoading) {
    return <div>loading...</div>;
  }
  sessionStorage.setItem("isLogin", isLogin ? "true" : "false");

  return !isLogin ? (
    <Login onLoginStatusChange={handleLoginChange} />
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="div"
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
        <Box sx={{ display: "flex" ,height:"100%"}}>
          <Box
            sx={{
              width: "10%",
              height:"100%",
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
                  selected={location.pathname === "/admindetail"}
                >
                  <ListItemIcon>
                    <HomeIcon></HomeIcon>
                  </ListItemIcon>
                  <ListItemText primary="我的项目" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box padding={"20px"}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                box-sizing="border-box"
              >
                <Grid item padding={"10px"}>
                  <Typography
                    variant="h5"
                    sx={{ color: "#4a4a4a", fontWeight: 500 }}
                  >
                    <Box sx={{ fontSize: 20, marginRight: 20 }} />
                    我的项目
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ marginRight: "16px" }}
                    variant="contained"
                    onClick={() => {
                      const newConfig = _.cloneDeep(config ?? {}) as Config;
                      newConfig.programs.splice(selectedIndex, 0, {
                        id: uuid.v4(),
                        intro: {
                          name: "占位文本",
                          type: "占位文本",
                          status: "占位文本",
                          unit: "占位文本",
                          inCharge: "占位文本",
                          bridgeImg:
                            "https://iph.href.lu/200x200?text=占位图片",
                        },

                        detail: {
                          situation: "占位文本",
                          model: "占位文本",

                          members: [
                            {
                              id: "89716C45-5746-3386-DC89-BB0E00479619",
                              index: "占位文本",
                              name: "占位文本",
                              position: "占位文本",
                              contactInfo: "占位文本",
                            },
                          ],

                          beamData: [
                            {
                              id: "90D5D563-6ABD-713A-2D72-4E61D0F5E281",
                              index: "占位文本",
                              long: "占位文本",
                              width: "占位文本",
                              smallMile: "占位文本",
                              bigMile: "占位文本",
                            },
                          ],

                          cableData: [
                            {
                              id: "096568BF-85A1-9BE2-823F-66B2F4F83DB2",
                              index: "占位文本",
                              elasticity: "占位文本",
                              vertical: "占位文本",
                              length: "占位文本",
                              force: "占位文本",
                            },
                          ],
                        },

                        instructions: [
                          {
                            id: "2517F526-F393-4BDA-B87E-D631E0CC8B27",
                            name:"占位文本",
                            file: "https://iph.href.lu/200x200?text=占位图片",
                          },
                        ],

                        progress: [
                          {
                            id: "A68B5F56-B53B-AD53-E5C2-11911CB9F7C6",
                            name: "占位文本",
                            model: "占位文本",
                          },
                        ],

                        quality: [
                          {
                            id: "F38CF419-A24F-48D3-858D-12940B56621F",
                            name: "占位文本",
                            elevation: {
                              name: "占位文本",
                              file: "https://iph.href.lu/200x200?text=占位图片",
                            },

                            cableForce: {
                              name: "占位文本",
                              file: "https://iph.href.lu/200x200?text=占位图片",
                            },
                          },
                        ],

                        sensor: {
                          name: "占位文本",
                          file: "https://iph.href.lu/200x200?text=占位图片",
                        },
                      });
                      setConfigMutation
                        .mutateAsync(newConfig)
                        .then(() => {
                          setMessage("添加项目成功");
                        })
                        .catch(() => {
                          setMessage("添加项目失败");
                        })
                        .finally(() => {
                          refetch();
                        });
                    }}
                  >
                    添加项目
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    disabled={(config?.programs.length ?? 0) <= 1}
                    onClick={() => {
                      const newConfig = _.cloneDeep(config ?? {}) as Config;
                      newConfig.programs.splice(selectedIndex, 1);
                      setConfigMutation
                        .mutateAsync(newConfig)
                        .then(() => {
                          setMessage("删除项目成功");
                        })
                        .catch(() => {
                          setMessage("删除项目失败");
                        })
                        .finally(() => {
                          refetch();
                        });
                    }}
                  >
                    删除项目
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box width={"100%" } padding={"20px"}>
              <Grid container spacing={3} sx={{}}>
                {config?.programs.map((project, index) => (
                  <Grid item xs={6} sm={1} md={3} key={project.id}>
                    <Card
                      sx={{
                        height: "auto",
                        border:
                          selectedIndex === index
                            ? `1px solid ${colors.blue[500]}`
                            : "unset",
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => {
                        setSelectedIndex(index);
                      }}
                    >
                      {/* <CardActionArea component={Link} to={"/admindetail"}> */}
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="160"
                          image={getFileURL(project.intro.bridgeImg)}
                          alt={project.intro.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {project.intro.name}
                          </Typography>
                          <List dense>
                            <ListItem disablePadding sx={{ paddingLeft: 0 }}>
                              <ListItemIcon>
                                <Typography
                                  variant="body2"
                                  sx={{ fontSize: 12 }}
                                >
                                  桥梁类型：
                                </Typography>
                              </ListItemIcon>
                              <ListItemText
                                primary={project.intro.type}
                                primaryTypographyProps={{
                                  variant: "body2",
                                  sx: { fontSize: 12 },
                                }}
                              />
                            </ListItem>
                            <ListItem disablePadding sx={{ paddingLeft: 0 }}>
                              <ListItemIcon>
                                <Typography
                                  variant="body2"
                                  sx={{ fontSize: 12 }}
                                >
                                  状态：
                                </Typography>
                              </ListItemIcon>
                              <ListItemText
                                primary={project.intro.status}
                                primaryTypographyProps={{
                                  variant: "body2",
                                  sx: { fontSize: 12 },
                                }}
                              />
                            </ListItem>
                            <ListItem disablePadding sx={{ paddingLeft: 0 }}>
                              <ListItemIcon>
                                <Typography
                                  variant="body2"
                                  sx={{ fontSize: 12 }}
                                >
                                  建设单位：
                                </Typography>
                              </ListItemIcon>
                              <ListItemText
                                primary={project.intro.unit}
                                primaryTypographyProps={{
                                  variant: "body2",
                                  sx: { fontSize: 12 },
                                }}
                              />
                            </ListItem>
                          </List>
                        </CardContent>
                      </CardActionArea>
                      <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button
                          onClick={() => {
                            navigator("/admin/" + project.id + "/admindetail");
                          }}
                          variant="contained"
                          size="small"
                          startIcon={<Visibility sx={{ fontSize: 16 }} />}
                        >
                          修改
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
