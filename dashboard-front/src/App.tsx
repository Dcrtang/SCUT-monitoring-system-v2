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
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { homeRoutes, allRoutes, theme } from "./constants";
import { useEffect, useRef, useState } from "react";
import { useConfig } from "./api";
import { ProjectsDetail } from "./pages/ProjectsDetail";
import { BrowserRouter } from "react-router-dom";

const genrateRoutes = (route: any): React.ReactNode => {
  if (!route?.children) {
    return <Route key={route.path} path={route.path} element={route.element} />;
  }

  return <Route key={route.path} path={route.path} element={route.element}>{route.children.map(curRoute => <Route key={curRoute.path} path={curRoute.path} element={curRoute.element} />)}</Route>;
};

function App() {
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
      <Routes>
        {/* {homeRoutes.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })} */}
        {homeRoutes.map(genrateRoutes)}
        {/* {allRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}  */}
      </Routes>
    </>
  );
}

export default App;
