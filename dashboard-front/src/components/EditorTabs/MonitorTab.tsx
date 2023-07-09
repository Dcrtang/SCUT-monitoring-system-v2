import { Box, Button, Card, colors, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, Snackbar, Tab, Tabs, TextField } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { setConfig, useConfig } from "../../api";
import { Config } from "../../types";
import { ImageSelector } from "../ImageSelector";
import * as uuid from "uuid";
import { AutoTextField } from "../AutoTextField";
import { MonitorDataEditor } from "./MonitorDataEditor";

export function MonitorTab() {
  const [tab, setTab] = useState(0);
  const [editIndex, setEditIndex] = useState<number>();
  const { data: config, refetch } = useConfig();
  const [message, setMessage] = useState<string>();
  const [tabText, setTabText] = useState("");
  const setConfigMutation = useMutation(setConfig);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    index: number;
  } | null>(null);
  const handleContextMenu = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
          mouseX: event.clientX + 2,
          mouseY: event.clientY - 6,
          index
        } : null,
    );
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          {config?.monitingData.map(({id, name}, index)=><Tab key={id} label={name} onContextMenu={(e)=>{handleContextMenu(e, index);}}/>)}
          <Button sx={{margin: 1}} variant="contained" onClick={()=>{
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.monitingData.push({
              id: uuid.v4(),
              name: "占位文本",
              data: [{
                id: uuid.v4(),
                name: "占位文本",
                dataImg: "https://iph.href.lu/200x200?text=占位图片",
                modelImg: "https://iph.href.lu/200x200?text=占位图片",
              }]
            });
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("添加桥梁成功");
              })
              .catch(() => {
                setMessage("添加桥梁失败");
              })
              .finally(() => {
                refetch();
              });
          }}>添加</Button>
        </Tabs>
      </Box>
      <Dialog fullWidth maxWidth="md" open={editIndex !== undefined} onClose={()=>{setEditIndex(undefined);}}>
        <DialogTitle>修改桥梁名称</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请输入桥梁名称
          </DialogContentText>
          <TextField
            autoFocus
            label="名称"
            fullWidth
            variant="standard"
            value={tabText}
            onChange={(e)=>{
              setTabText(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            const bridge = newConfig.monitingData[editIndex??0];
            bridge?bridge.name = tabText:null;
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("修改桥梁成功");
              })
              .catch(() => {
                setMessage("修改桥梁失败");
              })
              .finally(() => {
                refetch();
              });
            setEditIndex(undefined);
          }}>提交</Button>
        </DialogActions>
      </Dialog>
      <Menu
        open={contextMenu !== null}
        onClose={()=>{setContextMenu(null);}}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={()=>{
          setTabText(config?.monitingData[contextMenu?.index??0]?.name??"");
          setEditIndex(contextMenu?.index);
          setContextMenu(null);
        }}>修改</MenuItem>
        <MenuItem onClick={()=>{
          const newConfig = _.cloneDeep(config ?? {}) as Config;
          newConfig.monitingData.splice(contextMenu?.index ?? 0, 1);
          setConfigMutation
            .mutateAsync(newConfig)
            .then(() => {
              setMessage("删除桥梁成功");
            })
            .catch(() => {
              setMessage("删除桥梁失败");
            })
            .finally(() => {
              refetch();
            });
          setContextMenu(null);
        }}>删除</MenuItem>
      </Menu>

      <MonitorDataEditor index={tab} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!message}
        autoHideDuration={3000}
        onClose={() => {
          setMessage(undefined);
        }}
        message={message}
      />
    </>
  );
}
