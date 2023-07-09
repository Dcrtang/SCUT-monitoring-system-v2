import { Box, Button, Snackbar, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { setConfig, useConfig } from "../api";
import _ from "lodash";
import { useMemo, useState } from "react";
import { useMutation } from "react-query";

export function DataEditor(props: {
  field: string;
  label: string;
  columns: GridColDef[];
  generateNewRow: () => unknown;
}) {
  const { field, label, columns, generateNewRow } = props;
  const { data: config, refetch } = useConfig();
  const setConfigMutation = useMutation(setConfig);
  const [message, setMessage] = useState<string>();
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const value = useMemo(() => _.get(config, field), [config, field]);
  return (
    <Box sx={{ height: "500px", marginBottom: "100px" }}>
      <Typography variant="h6" component="div">
        {label}
      </Typography>
      <Box sx={{ margin: "8px 0" }}>
        <Button
          sx={{ marginRight: "16px" }}
          variant="contained"
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {});
            const data = _.get(newConfig, field) as unknown[];
            if (selectionModel[0]) {
              const index = (data as { id: string }[]).findIndex(
                (row) => row.id === selectionModel[0]
              );
              data.splice(index < 0 ? 0 : index, 0, generateNewRow());
            } else {
              data.push(generateNewRow());
            }
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("表格更新成功");
              })
              .catch(() => {
                setMessage("表格更新失败");
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
          disabled={selectionModel.length < 1}
          onClick={() => {
            const newConfig = _.cloneDeep(config ?? {});
            const data = _.get(newConfig, field) as unknown[];
            const index = (data as { id: string }[]).findIndex(
              (row) => row.id === selectionModel[0]
            );
            data.splice(index < 0 ? 0 : index, 1);
            setConfigMutation
              .mutateAsync(newConfig)
              .then(() => {
                setMessage("表格更新成功");
              })
              .catch(() => {
                setMessage("表格更新失败");
              })
              .finally(() => {
                refetch();
              });
          }}
        >
          删除
        </Button>
      </Box>
      <DataGrid
        rows={value ?? []}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={setSelectionModel}
        selectionModel={selectionModel}
        processRowUpdate={async (newRow) => {
          const newConfig = _.cloneDeep(config ?? {});
          const data = _.get(newConfig, field) as { id: string }[];
          const index = data.findIndex((row) => row.id === newRow.id);
          if (index === -1) return;
          data[index] = newRow;
          try {
            await setConfigMutation.mutateAsync(newConfig);
            setMessage("表格更新成功");
            return newRow;
          } catch {
            setMessage("表格更新失败");
          } finally {
            refetch();
          }
        }}
      />
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
