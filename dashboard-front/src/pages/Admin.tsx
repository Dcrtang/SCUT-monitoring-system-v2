import {
  Box,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import * as uuid from "uuid";
import { useEffect, useState } from "react";
import { DataEditor } from "../components/DataEditor";
import { ImageSelector } from "../components/ImageSelector";
import { AutoTextField } from "../components/AutoTextField";
import { InstructionImagesTab } from "../components/EditorTabs/InstuctionImagesTab";
import { MonitorTab } from "../components/EditorTabs/MonitorTab";
import { ProgressTab } from "../components/EditorTabs/ProgressTab";
import { checkLogin, reset } from "../api";
import { useMutation } from "react-query";
import { QualityTab } from "../components/EditorTabs/QualityTab";
import { ReportTab } from "../components/EditorTabs/ReportTab";

export function Admin() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const checkLoginMutation = useMutation(checkLogin, { retry: false });
  useEffect(() => {
    checkLoginMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resetMutation = useMutation(reset);
  return checkLoginMutation.isLoading ? (
    <div>loading...</div>
  ) : (
    <Box sx={{ position: "relative" }}>
      <Button
        variant="contained"
        color="error"
        sx={{ position: "absolute", top: "0", right: "0", zIndex: "10" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        重置应用程序
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>确定要重置应用程序吗？</DialogTitle>
        <DialogContent>
          这将重置配置文件并删除所有已经上传的文件，请谨慎操作。
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              resetMutation.mutateAsync().then(() => {
                location.reload();
              });
            }}
          >
            重置
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="项目简介" />
          <Tab label="工程进度" />
          <Tab label="钢箱梁厂内验收报告" />
          <Tab label="施工监测数据" />
          <Tab label="指令属性" />
          <Tab label="工程质量管理" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <>
          <AutoTextField field="title" label="网站标题" fullwidth />
          <AutoTextField
            field="intro.text"
            label="项目概况文本"
            multiline
            fullwidth
          />
          <Box sx={{ height: "12px" }} />
          <ImageSelector field="intro.img" label="项目概况图片" />
          <Box sx={{ height: "36px" }} />
          <DataEditor
            field="intro.members"
            label="人员组织表格"
            columns={[
              {
                field: "name",
                headerName: "姓名",
                editable: true,
                flex: 1,
              },
              {
                field: "cert",
                headerName: "证书",
                editable: true,
                flex: 1,
              },
              {
                field: "title",
                headerName: "职位",
                editable: true,
                flex: 1,
              },
            ]}
            generateNewRow={() => ({
              id: uuid.v4(),
              name: "占位文本",
              cert: "占位文本",
              title: "占位文本",
            })}
          />
          <Box sx={{ height: "12px" }} />
          <DataEditor
            field="intro.unitData"
            label="主梁单元数据表格"
            columns={[
              {
                field: "type",
                headerName: "类型",
                editable: true,
                flex: 1,
              },
              {
                field: "area",
                headerName: "面积",
                editable: true,
                flex: 1,
              },
              {
                field: "moment",
                headerName: "力矩",
                editable: true,
                flex: 1,
              },
            ]}
            generateNewRow={() => ({
              id: uuid.v4(),
              type: "占位文本",
              area: "占位文本",
              moment: "占位文本",
            })}
          />
          <ImageSelector field="intro.bridgeImg" label="主梁单元数据图片" />
        </>
      )}
      {tab === 1 && <ProgressTab />}
      {tab === 2 && <ReportTab />}
      {tab === 3 && <MonitorTab />}
      {tab === 4 && <InstructionImagesTab />}
      {tab === 5 && <QualityTab />}
    </Box>
  );
}
