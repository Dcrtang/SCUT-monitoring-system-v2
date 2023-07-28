import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  CssBaseline,
  colors,
  ListItemButton,
  ThemeProvider,
} from "@mui/material";
import { ArrowBack, Visibility, ListOutlined } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, Route, useNavigate } from "react-router-dom";
import { getFileURL, useConfig } from "../api";
import { useRef } from "react";
import { theme } from "../constants";

export function Projects() {
  // const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  const navigator = useNavigate();
  const navBarRef = useRef<HTMLDivElement>();
  return (
    <>
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
                  {config?.title}
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            {/* 使用Box组件来添加固定的菜单列表 */}
            <Box
              sx={{
                width: "15%",
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
                <ListItem disablePadding sx={{ height: "8%" }}>
                  <ListItemButton
                    sx={{ height: "100%", width: "100%" }}
                    selected={location.pathname === "/"}
                  >
                    <ListItemIcon>
                      <HomeIcon></HomeIcon>
                    </ListItemIcon>
                    <ListItemText primary="我的项目" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            {/* 将Grid组件放在Box组件内，使其显示在菜单列表的右侧 */}
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{ color: "#4a4a4a", fontWeight: 500 }}
                  >
                    <Box sx={{ fontSize: 20, marginRight: 1 }} />
                    我的项目
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ListOutlined sx={{ fontSize: 16 }} />}
                  >
                    列表展示
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ marginTop: 3}}>
                {config?.programs.map((project) => (
                  <Grid item xs={12} sm={6} md={3} key={project.id}>
                    <Card sx={{ height: "100%" }}>
                      <CardActionArea
                        component={Link}
                        to={"/projectsdetail/" + project.id}
                      >
                        <CardMedia
                          component="img"
                          height="140"
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
                            <ListItem disablePadding sx={{ paddingLeft: 2 }}>
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
                            navigator(
                              "/projectsdetail/" + project.id + "/intro"
                            );
                          }}
                          variant="contained"
                          size="small"
                          startIcon={<Visibility sx={{ fontSize: 16 }} />}
                        >
                          查看
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
