import { createTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CachedIcon from "@mui/icons-material/Cached";
import AirplayIcon from "@mui/icons-material/Airplay";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Admin } from "./pages/Admin";
import { Intro } from "./pages/Intro";
import { Login } from "./pages/Login";
import { Sensor } from "./pages/Sensor";
import { Progress } from "./pages/Progress";
import { Instructions } from "./pages/Instructions";
import { Quality } from "./pages/Quality";
import { Projects } from "./pages/Projects";
import { ProjectsDetail } from "./pages/ProjectsDetail";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Noto Sans SC\"",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\"",
    ].join(","),
  },
  palette:{
    primary:{
      main:"#2B3643",
    },
  }
  
});

export const allRoutes = [
  {
    path: "intro",
    element: <Intro />,
    title: "项目详情",
    icon: <HomeIcon />,
  },

  {
    path: "instructions",
    element: <Instructions />,
    title: "指令下发",
    icon: <AppsIcon />,
  },
  {
    path: "progress",
    element: <Progress />,
    title: "工程进度管理",
    icon: <CachedIcon />,
  },
  {
    path: "quality",
    element: <Quality />,
    title: "工程质量管理",
    icon: <SettingsIcon />,
  },
  {
    path: "sensor",
    element: <Sensor />,
    title: "应力传感器检测",
    icon: <AirplayIcon />,
  },
  {
    path: "admin",
    element: <Admin />,
    title: import.meta.env.DEV ? "管理" : undefined,
    icon: <ManageAccountsIcon />,
  },
];

export const homeRoutes = [
  {
    path: "/",
    element: <Projects />,
    title: "项目",
    icon: <HomeIcon />,
  },
  {
    path: "/projects",
    element: <Projects />,
    title: "项目",
    icon: <HomeIcon />,
  },
  {
    path: "/projectsdetail/:projectId",
    element: <ProjectsDetail />,
    title: "项目",
    icon: <HomeIcon />,
    children: allRoutes,
  },
];
