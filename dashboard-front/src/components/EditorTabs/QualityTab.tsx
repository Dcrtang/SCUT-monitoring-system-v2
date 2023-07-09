import { Box, Button, Card, colors, Snackbar } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { setConfig, useConfig } from "../../api";
import { Config } from "../../types";
import { ImageSelector } from "../ImageSelector";
import * as uuid from "uuid";
import { AutoTextField } from "../AutoTextField";

export function QualityTab() {
  const { data: config, refetch } = useConfig();
  const [message, setMessage] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const setConfigMutation = useMutation(setConfig);

  return (
    <Box sx={{ marginTop: "12px" }}>
      <Box sx={{ margin: "8px 0" }}>
        <Button
          sx={{ marginRight: "16px" }}
          variant="contained"
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.quality.splice(selectedIndex, 0, {
              id: uuid.v4(),
              name: "占位文本",
              img1: "https://iph.href.lu/200x200?text=占位图片",
              img2: "https://iph.href.lu/200x200?text=占位图片",
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
          disabled={(config?.quality?.length ?? 0) <= 1}
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.quality.splice(selectedIndex, 1);
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
      {config?.quality.map((data, index) => (
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
          }}
          onClick={() => {
            setSelectedIndex(index);
          }}
        >
          <AutoTextField field={`quality[${index}].name`} label={"阶段名称"} />
          <Box sx={{ height: "12px" }} />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <ImageSelector
              field={`quality[${index}].img1`}
              label={`${config?.quality?.[index]?.name}数据图片`}
            />
            <Box sx={{ width: "12px" }} />
            <ImageSelector
              field={`quality[${index}].img2`}
              label={`${config?.quality?.[index]?.name}模型图片`}
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
