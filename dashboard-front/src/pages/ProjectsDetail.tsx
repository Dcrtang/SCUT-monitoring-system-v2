import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  colors,
  ListItemIcon,
} from "@mui/material";
import {  useLocation, useNavigate, Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { allRoutes ,theme } from "../constants";
import {  useRef } from "react";
import { useConfig } from "../api";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const defaultInsertRoute = {
  path: "/",
  title: "返回我的项目",
  icon: <ArrowBackIcon />,
};

export function ProjectsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const navBarRef = useRef<HTMLDivElement>();
  const { data: config } = useConfig();
 
  // type RouteObject = {
  //   path: string;
  //   element: JSX.Element;
  //   title?: string | null;
  //   icon?: JSX.Element | null;
  // };
  // const [routes, setRoutes] = useState<RouteObject[]>(homeroutes);

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     setRoutes(homeroutes);
  //   } else {
  //     setRoutes(allRoutes);
  //   }
  // }, [location, setRoutes]);
  return (
    <>
      <CssBaseline />
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box component="div" ref={navBarRef}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                  {config?.title}
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>

          <Box
            sx={{
              display: "flex",
              height: "calc(100vh - 64px)",
            }}
          >
            <Box sx={{ width: "18%", height: "100%", flexShrink: 0 }}>
              <List sx={{ backgroundColor: colors.grey[100], height: "100%" }}>
                {[...allRoutes, defaultInsertRoute].map((route) =>
                  route.title ? (
                    <ListItem
                      key={route.path}
                      disablePadding
                      sx={{ height: "8%" }}
                    >
                      <ListItemButton
                        sx={{ height: "100%" }}
                        selected={location.pathname === `/projectsdetail/${route.path}`}
                        onClick={() => {
                          navigate(route.path);
                        }}
                      >
                        <ListItemIcon>{route.icon}</ListItemIcon>
                        <ListItemText primary={route.title} />
                      </ListItemButton>
                    </ListItem>
                  ) : null
                )}
              </List>
            </Box>
            <Box
              sx={{
                bgcolor: "white",
                flexGrow: 1,
                padding: "16px",
                overflowY: "scroll",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
    
  );
}


