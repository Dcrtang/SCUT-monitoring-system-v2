import { createTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CachedIcon from "@mui/icons-material/Cached";
import AirplayIcon from "@mui/icons-material/Airplay";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Admin } from "./pages/Admin";
import { Intro } from "./pages/Intro";
import { Login } from "./pages/Login";
import { Sensor } from "./pages/Sensor";
import { Progress } from "./pages/Progress";
import { Instructions } from "./pages/Instructions";
import { Quality } from "./pages/Quality";
import { Report } from "./pages/Report";
import {Projects} from "./pages/Projects";


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
});



export const allRoutes = [
  {
    path: "/",
    element: <Progress />,
    title:"返回我的项目",
    icon:<ArrowBackIcon />,
  
  },

  {
    path: "intro/:projectId",
    element: <Intro />,
    title: "项目详情",
    icon: <HomeIcon />,
  
  },

  // {
  //   path: "/report",
  //   element: <Report />,
  //   title: "钢箱梁厂内验收报告",
  //   icon: <BatchPredictionIcon />,
  // },
  // {
  //   path: "/monitor",
  //   element: <Monitor />,
  //   title: "施工监控数据",
  //   icon: <AirplayIcon />,
  // },
  {
    path: "/instructions/:projectId",
    element: <Instructions />,
    title: "指令下发",
    icon: <AppsIcon />,
  },
  {
    path: "/progress/:projectId",
    element: <Progress />,
    title: "工程进度管理",
    icon: <CachedIcon />,
  },
  {
    path: "/quality/:projectId",
    element: <Quality />,
    title: "工程质量管理",
    icon: <SettingsIcon />,
  },
  {
    path: "/sensor/:projectId",
    element: <Sensor />,
    title: "应力传感器检测",
    icon: <AirplayIcon />,
  },
  {
    path: "/admin",
    element: <Admin />,
    title: import.meta.env.DEV ? "管理" : undefined,
    icon: <ManageAccountsIcon />,
  },
  {
    path: "/login",
    element: <Login />,
  
  
  },

];


export const homeroutes = [
  {
    path: "/",
    element: <Projects />,
    title: "项目", 
    icon: <HomeIcon />,   
  },

];


