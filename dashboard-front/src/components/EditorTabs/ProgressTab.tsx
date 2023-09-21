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

export function ProgressTab() {
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
            newConfig.programs[programsId]?.progress.splice(selectedIndex, 0, {
              id: uuid.v4(),
              name: "占位文本",
              model: {
                fileId: '占位文本',
                viewToken: '占位文本',
              },
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
          disabled={(config?.programs[programsId]?.progress?.length ?? 0) <= 1}
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.programs[programsId]?.progress.splice(selectedIndex, 1);
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
      {config?.programs[programsId]?.progress?.map((data, index) => (
        <Card
          key={data.id}
          sx={{
            margin: "12px 0",
            padding: "24px",
            border:
              selectedIndex === index
                ? `2px solid ${colors.blue[500]}`
                : "unset",
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
          <AutoTextField field={`programs[${programsId}].progress[${index}].name`} label={"阶段名称"} />
          {/* <Box sx={{ height: "12px" }} />
          <AutoTextField
            multiline
            field={`programs[0].progress[${index}].text`}
            label={`${config?.programs[0]?.progress?.[index]?.name}进度说明`}
          />
          <Box sx={{ height: "12px" }} /> */}
          <AutoTextField
            field={`programs[${programsId}].progress[${index}].model.fileId`}
            label="模型ID"
            multiline
            fullwidth
          />
          <AutoTextField
            field={`programs[${programsId}].progress[${index}].model.viewToken`}
            label="模型token"
            multiline
            fullwidth
          />
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
