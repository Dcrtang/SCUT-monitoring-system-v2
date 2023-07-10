import React, { useState, useEffect } from "react";
import {
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
  Typography,
} from "@mui/material";
import { ArrowBack, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { getFileURL, useConfig } from "../api";
import { useParams } from 'react-router-dom';



export function Projects() {
  
  
  
  const [tab, setTab] = useState(0);
  const { data: config } = useConfig();
  
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5" sx={{ color: "#4a4a4a", fontWeight: 500 }}>
            <Box sx={{ fontSize: 20, marginRight: 1 }} />
            我的项目
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="small"
            startIcon={<Visibility sx={{ fontSize: 16 }} />}
          >
            列表展示
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {config?.programs.map((project) => (
          <Grid item xs={12} sm={6} md={3} key={project.id}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea component={Link} to={`/intro/${project.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.intro.bridgeImg}
                  alt={project.intro.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.intro.name}
                  </Typography>
                  <List dense>
                    <ListItem disablePadding sx={{ paddingLeft: 0 }}>
                      <ListItemIcon>
                        <Typography variant="body2" sx={{ fontSize: 12 }}>
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
                        <Typography variant="body2" sx={{ fontSize: 12 }}>
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
                        <Typography variant="body2" sx={{ fontSize:12 }}>
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
                  href={`/intro/
                  ${project.id}
                  `}
                
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
  );
}