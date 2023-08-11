import { Box, Button, Card, colors, Snackbar } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { setConfig, useConfig } from "../../api";
import { Config } from "../../types";
import * as uuid from "uuid";
import { AutoTextField } from "../AutoTextField";
import { useParams } from "react-router-dom";
import { UploadPdf } from "../UploadPdf";

export function QualityTab() {
  const { data: config, refetch } = useConfig();
  const [message, setMessage] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setConfigMutation = useMutation(setConfig);
  const { projectId } = useParams();
  const programsId =
    config?.programs.findIndex((program) => program.id === projectId) || 0;
  return (
    <Box sx={{ marginTop: "12px" }}>
      <Box sx={{ margin: "8px 0" }}>
        <Button
          sx={{ marginRight: "16px" }}
          variant="contained"
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.programs[programsId]?.quality.splice(selectedIndex, 0, {
              id: uuid.v4(),
              name: "占位文本",
              elevation: { name: "占位文本", file: "https://iph.href.lu/200x200?text=占位图片" },
              cableForce: { name: "占位文本", file: "https://iph.href.lu/200x200?text=占位图片" },
            });
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("添加阶段成功");
              })
              .catch(() => {
                setMessage("添加阶段失败");
              })
              .finally(() => {
                refetch();
              });
          }}
        >
          添加
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={(config?.programs[programsId]?.quality.length ?? 0) <= 1}
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.programs[programsId]?.quality.splice(selectedIndex, 1);
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("删除阶段成功");
              })
              .catch(() => {
                setMessage("删除阶段失败");
              })
              .finally(() => {
                refetch();
              });
          }}
        >
          删除
        </Button>
      </Box>
      {config?.programs[programsId]?.quality.map((data, index) => (
        <Card
          key={data.id}
          sx={{
            margin: "12px 0",
            padding: "24px",
            border:
              selectedIndex === index
                ? `2px solid ${colors.blue[500]}`
                : "unstet",
            ":hover": {
              cursor: "pointer",
            },
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => {
            setSelectedIndex(index);
          }}
        >
          <AutoTextField
            field={`programs[${programsId}].quality[${index}].name`}
            label={"质量管理阶段名称"}
          />

          <Box sx={{ height: "12px" }} />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <AutoTextField
              field={`programs[${programsId}].quality[${index}].elevation.name`}
              label={"安装标高验收名称"}
              multiline
              fullwidth
            />
            <Box sx={{ width: "100px" }} />
            <AutoTextField
              field={`programs[${programsId}].quality[${index}].cableForce.name`}
              label={"斜拉索名称"}
              multiline
              fullwidth
            />
          </Box>
          <Box sx={{ height: "12px" }} />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <UploadPdf
              field={`programs[${programsId}].quality[${index}].elevation.file`}
              label={`${config?.programs[programsId]?.quality?.[index]?.name}安装标高验收文件`}
            />
            <Box sx={{ width: "300px" }} />
            <UploadPdf
              field={`programs[${programsId}].quality[${index}].cableForce.file`}
              label={`${config?.programs[programsId]?.quality?.[index]?.name}斜拉索文件`}
            />
          </Box>
        </Card>
      ))}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!message}
        autoHideDuration={3000}
        onClose={() => {
          setMessage(undefined);
        }}
        message={message}
      />
    </Box>
  );
}
