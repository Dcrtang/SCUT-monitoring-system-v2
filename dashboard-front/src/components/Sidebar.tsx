import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  colors,
  ListItemIcon,
} from "@mui/material";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { allRoutes, theme } from "../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import { useConfig } from "../api";
const defaultInsertRoute = {
  path: "/projects",
  title: "返回我的项目",
  icon: <ArrowBackIcon />,
};
export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const navBarRef = useRef<HTMLDivElement>();
  
  return (
    <>
      <Box sx={{ width: "18%", height: "100%", flexShrink: 0 }}>
        <List sx={{ backgroundColor: colors.grey[100], height: "100%" }}>
          {[
            ...allRoutes,
            defaultInsertRoute
          ].map((route) =>
            route.title ? (
              <ListItem key={route.path} disablePadding sx={{ height: "8%" }}>
                <ListItemButton
                  sx={{ height: "100%" }}
                  selected={location.pathname === route.path}
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
    </>
  );
}
