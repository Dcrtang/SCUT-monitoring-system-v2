import { Box, Button, Card, colors, Snackbar } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { setConfig, useConfig } from "../../api";
import { Config } from "../../types";
import * as uuid from "uuid";
import { useParams } from "react-router-dom";
import { UploadPdf } from "../UploadPdf";
import { AutoTextField } from "../AutoTextField";

export function InstructionTab() {
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
            newConfig.programs[programsId]?.instructions.splice(
              selectedIndex,
              0,
              {
                id: uuid.v4(),
                name: "占位文本",
                file: "https://iph.href.lu/200x200?text=占位图片",
              }
            );
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("添加指令成功");
              })
              .catch(() => {
                setMessage("添加指令失败");
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
          disabled={
            (config?.programs[programsId]?.instructions?.length ?? 0) <= 1
          }
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.programs[programsId]?.instructions.splice(
              selectedIndex,
              1
            );
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("删除指令成功");
              })
              .catch(() => {
                setMessage("删除指令失败");
              })
              .finally(() => {
                refetch();
              });
          }}
        >
          删除
        </Button>
      </Box>
      {config?.programs[programsId]?.instructions?.map((instruction, index) => (
        <Card
          key={instruction.id}
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
          }}
          onClick={() => {
            setSelectedIndex(index);
          }}
        >
          <AutoTextField
            field={`programs[${programsId}].instructions[${index}].name`}
            label={"指令名称"}
          />
          <UploadPdf
            field={`programs[${programsId}].instructions[${index}].file`}
            label={`指令下发文件${index + 1}`}
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
