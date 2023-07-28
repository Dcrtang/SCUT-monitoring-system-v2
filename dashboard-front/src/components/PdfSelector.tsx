import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  Snackbar,
} from "@mui/material";
import { getFileURL, setConfig, upload, useConfig } from "../api";
import _ from "lodash";
import { useMemo, useState } from "react";
import { useMutation } from "react-query";
import PdfViewer from "./PdfViewer";

export function PdfSelector(props: { field: string; label: string }) {
  const { field, label } = props;
  const { data: config, refetch } = useConfig();
  const setConfigMutation = useMutation(setConfig);
  const [message, setMessage] = useState<string>();
  const uploadMutation = useMutation(upload);

  const Img = useMemo(
    () => getFileURL(_.get(config, field) as string),
    [config, field]
  );
  return (
    <Box>
      <Box sx={{ width: "300px", height: "300px" }}>
        {/* <PdfViewer pdfUrl={pdf} /> */}
      </Box>
      <FormControl variant="standard">
        <Input
          type="file"
          componentsProps={{ input: { accept: ".pdf" } }}
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            uploadMutation
              .mutateAsync(file)
              .then((fileName) => {
                setMessage("文件更新成功");
                const newConfig = _.cloneDeep(config ?? {});
                _.set(newConfig, field, fileName);
                return setConfigMutation.mutateAsync(newConfig);
              })
              .catch(() => setMessage("文件更新失败"))
              .finally(() => {
                refetch();
              });
          }}
        />
        <FormHelperText>{label}</FormHelperText>
      </FormControl>
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
