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


interface Project {
  id: number;
  title: string;
  imageUrl: string;
  bridgeType: string;
  status: string;
  constructionUnit: string;
}

export function Projects() {
  // const [projects, setProjects] = useState<Project[]>([]);

  // useEffect(() => {
  //   fetch("projects.json")
  //     .then((response) => response.json())
  //     .then((data) => setProjects(data));
  // }, []);
 //示例数据
  const projects = [
    {
      id: 1,
      title: "项目1",
      imageUrl: "https://via.placeholder.com/150",
      bridgeType: "类型1",
      status: "状态1",
      constructionUnit: "单位1",
    },
    {
      id: 2,
      title: "项目2",
      imageUrl: "https://via.placeholder.com/150",
      bridgeType: "类型2",
      status: "状态2",
      constructionUnit: "单位2",
    },
  ];


  return (
    <Box sx={{ padding: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5" sx={{ color: "#4a4a4a", fontWeight: 500 }}>
            <ArrowBack sx={{ fontSize: 20, marginRight: 1 }} />
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
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={3} key={project.id}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea component={Link} to={`/projects/${project.id}`}>
                <CardMedia
                  component="img"
                  height="140"
                  image={project.imageUrl}
                  alt={project.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {project.title}
                  </Typography>
                  <List dense>
                    <ListItem disablePadding sx={{ paddingLeft: 0 }}>
                      <ListItemIcon>
                        <Typography variant="body2" sx={{ fontSize: 12 }}>
                          桥梁类型：
                        </Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary={project.bridgeType}
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
                        primary={project.status}
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
                        primary={project.constructionUnit}
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
                  href={`/intro/${project.id}`}
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
