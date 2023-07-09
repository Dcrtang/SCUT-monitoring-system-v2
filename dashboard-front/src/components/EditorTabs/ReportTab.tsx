import { Box, Button, Card, colors, Snackbar } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { useMutation } from "react-query";
import { setConfig, useConfig } from "../../api";
import { Config } from "../../types";
import { ImageSelector } from "../ImageSelector";
import * as uuid from "uuid";
import { AutoTextField } from "../AutoTextField";
import { DataEditor } from "../DataEditor";

export function ReportTab() {
  const { data: config, refetch } = useConfig();
  const [message, setMessage] = useState<string>();
  const [step, setStep] = useState(0);
  const setConfigMutation = useMutation(setConfig);
  return (
    <Box sx={{ marginTop: "12px" }}>
      <Box sx={{ margin: "8px 0" }}>
        <Button
          sx={{ marginRight: "16px" }}
          variant="contained"
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.report.splice(step, 0, {
              id: uuid.v4(),
              name: "占位文本",
              description: "占位文本",
              length: [
                {
                  id: uuid.v4(),
                  name: "占位文本",
                  lengthNum: "占位文本",
                  factLeft: "占位文本",
                  factMid: "占位文本",
                  factRight: "占位文本",
                  theoryLeft: "占位文本",
                  theoryMid: "占位文本",
                  theoryRight: "占位文本",
                  errorLeft: "占位文本",
                  errorMid: "占位文本",
                  errorRight: "占位文本",
                },
              ],

              width: [
                {
                  id: uuid.v4(),
                  name: "占位文本",
                  widthNum: "占位文本",
                  factLeft: "占位文本",
                  factMid: "占位文本",
                  factRight: "占位文本",
                  theoryLeft: "占位文本",
                  theoryMid: "占位文本",
                  theoryRight: "占位文本",
                  errorLeft: "占位文本",
                  errorMid: "占位文本",
                  errorRight: "占位文本",
                },
              ],
              lengthImg: "https://iph.href.lu/200x200?text=占位图片",
              widthImg: "https://iph.href.lu/200x200?text=占位图片",
              hengImg: "https://iph.href.lu/200x200?text=占位图片",
              zongImg: "https://iph.href.lu/200x200?text=占位图片",
            });
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("添加成功");
              })
              .catch(() => {
                setMessage("添加失败");
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
          disabled={(config?.report.length ?? 0) <= 1}
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {}) as Config;
            newConfig.report.splice(step, 1);
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("删除成功");
              })
              .catch(() => {
                setMessage("删除失败");
              })
              .finally(() => {
                refetch();
              });
          }}
        >
          删除
        </Button>
      </Box>
      {config?.report.map((report, index) => (
        <Card
          key={report.id}
          sx={{
            margin: "12px 0",
            padding: "24px",
            border: step === index ? `2px solid ${colors.blue[500]}` : "unset",
            ":hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => {
            setStep(index);
          }}
        >
          <AutoTextField
            multiline
            fullwidth
            field={`report[${index}].name`}
            label={"请输入名称"}
          />
          <Box sx={{ height: "12px" }} />
          <AutoTextField
            multiline
            fullwidth
            field={`report[${index}].description`}
            label={"请输入描述文本"}
          />
          <Box sx={{ height: "36px" }} />
          <DataEditor
            field={`report[${index}].length`}
            label="验收报告梁长表格"
            columns={[
              {
                field: "name",
                headerName: "梁段号",
                editable: true,
                flex: 1,
              },
              // {
              //   field: "",
              //   headerName: "实测间距",
              //   editable: false,
              //   flex: 1,
              // },
              {
                field: "factLeft",
                headerName: "实测间距左",
                editable: true,
                flex: 1,
              },
              {
                field: "factMid",
                headerName: "实测间距中",
                editable: true,
                flex: 1,
              },
              {
                field: "factRight",
                headerName: "实测间距右",
                editable: true,
                flex: 1,
              },
              // {
              //   field: "",
              //   headerName: "理论间距",
              //   editable: false,
              //   flex: 1,
              // },
              {
                field: "theoryLeft",
                headerName: "理论间距左",
                editable: true,
                flex: 1,
              },
              {
                field: "theoryMid",
                headerName: "理论间距中",
                editable: true,
                flex: 1,
              },
              {
                field: "theoryRight",
                headerName: "理论间距右",
                editable: true,
                flex: 1,
              },
              // {
              //   field: "",
              //   headerName: "误差",
              //   editable: false,
              //   flex: 1,
              // },
              {
                field: "errorLeft",
                headerName: "误差左",
                editable: true,
                flex: 1,
              },
              {
                field: "errorMid",
                headerName: "误差中",
                editable: true,
                flex: 1,
              },
              {
                field: "errorRight",
                headerName: "误差右",
                editable: true,
                flex: 1,
              },
            ]}
            generateNewRow={() => ({
              id: uuid.v4(),
              name: "占位文本",
              factLeft: "占位文本",
              factMid: "占位文本",
              factRight: "占位文本",
              theoryLeft: "占位文本",
              theoryMid: "占位文本",
              theoryRight: "占位文本",
              errorLeft: "占位文本",
              errorid: "占位文本",
              errorRight: "占位文本",
            })}
          />
          <Box sx={{ height: "36px" }} />
          <DataEditor
            field={`report[${index}].width`}
            label="验收报告梁宽表格"
            columns={[
              {
                field: "name",
                headerName: "梁段号",
                editable: true,
                flex: 1,
              },
              // {
              //   field: "",
              //   headerName: "实测间距",
              //   editable: false,
              //   flex: 1,
              // },
              {
                field: "factLeft",
                headerName: "实测间距左",
                editable: true,
                flex: 1,
              },
              {
                field: "factMid",
                headerName: "实测间距中",
                editable: true,
                flex: 1,
              },
              {
                field: "factRight",
                headerName: "实测间距右",
                editable: true,
                flex: 1,
              },
              // {
              //   field: "",
              //   headerName: "理论间距",
              //   editable: false,
              //   flex: 1,
              // },
              {
                field: "theoryLeft",
                headerName: "理论间距左",
                editable: true,
                flex: 1,
              },
              {
                field: "theoryMid",
                headerName: "理论间距中",
                editable: true,
                flex: 1,
              },
              {
                field: "theoryRight",
                headerName: "理论间距右",
                editable: true,
                flex: 1,
              },
              // {
              //   field: "",
              //   headerName: "误差",
              //   editable: false,
              //   flex: 1,
              // },
              {
                field: "errorLeft",
                headerName: "误差左",
                editable: true,
                flex: 1,
              },
              {
                field: "errorMid",
                headerName: "误差中",
                editable: true,
                flex: 1,
              },
              {
                field: "errorRight",
                headerName: "误差右",
                editable: true,
                flex: 1,
              },
            ]}
            generateNewRow={() => ({
              id: uuid.v4(),
              name: "占位文本",
              factLeft: "占位文本",
              factMid: "占位文本",
              factRight: "占位文本",
              theoryLeft: "占位文本",
              theoryMid: "占位文本",
              theoryRight: "占位文本",
              errorLeft: "占位文本",
              errorid: "占位文本",
              errorRight: "占位文本",
            })}
          />
          <Box sx={{ height: "12px" }} />
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "12px" }} />
            <ImageSelector
              field={`report[${index}].lengthImg`}
              label={"梁长图片"}
            />
            <Box sx={{ width: "12px" }} />
            <ImageSelector
              field={`report[${index}].widthImg`}
              label={"梁宽图片"}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "12px" }} />
            <ImageSelector
              field={`report[${index}].hengImg`}
              label={"横坡图片"}
            />
            <Box sx={{ width: "12px" }} />
            <ImageSelector
              field={`report[${index}].zongImg`}
              label={"纵坡图片"}
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
