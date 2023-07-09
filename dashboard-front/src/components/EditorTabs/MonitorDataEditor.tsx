import { Box, Button, Card, colors, Snackbar } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { setConfig, useConfig } from "../../api";
import { Config } from "../../types";
import { ImageSelector } from "../ImageSelector";
import * as uuid from "uuid";
import { AutoTextField } from "../AutoTextField";

export function MonitorDataEditor(props: {index: number}) {
  const {index} = props;
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
            newConfig.monitingData[index]?.data.splice(selectedIndex, 0, {
              id: uuid.v4(),
              name: "占位文本",
              dataImg: "https://iph.href.lu/200x200?text=占位图片",
              modelImg: "https://iph.href.lu/200x200?text=占位图片",
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
          disabled={(config?.monitingData[index]?.data.length ?? 0) <= 1}
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.monitingData[index]?.data.splice(selectedIndex, 1);
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
      {config?.monitingData[index]?.data.map((data, idx) => (
        <Card
          key={data.id}
          sx={{
            margin: "12px 0",
            padding: "24px",
            border:
              selectedIndex === idx
                ? `2px solid ${colors.blue[500]}`
                : "unset",
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            setSelectedIndex(idx);
          }}
        >
          <AutoTextField
            field={`monitingData[${index}].data[${idx}].name`}
            label={"阶段名称"}
          />
          <Box sx={{ height: "12px" }} />
          <Box
            sx={{
              display: "flex",
            }}
          >
            <ImageSelector
              field={`monitingData[${index}].data[${idx}].dataImg`}
              label={`${config?.monitingData[index]?.data?.[idx]?.name}数据图片`}
            />
            <Box sx={{ width: "12px" }} />
            <ImageSelector
              field={`monitingData[${index}].data[${idx}].modelImg`}
              label={`${config?.monitingData[index]?.data?.[idx]?.name}模型图片`}
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
