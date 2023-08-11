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
import { Document, Page } from "react-pdf";

export function UploadPdf(props: { field: string; label: string }) {
  const { field, label } = props;
  const { data: config, refetch } = useConfig();
  const setConfigMutation = useMutation(setConfig);
  const [message, setMessage] = useState<string>();
  const uploadMutation = useMutation(upload);

  const pdf = useMemo(
    () => getFileURL(_.get(config, field) as string),
    [config, field]
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleUpload(file);
  };

  const handleFileClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf";
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      handleUpload(file);
    };
    fileInput.click();
  };

  const handleUpload = (file: File | undefined) => {
    if (!file) return;
    uploadMutation
      .mutateAsync(file)
      .then((fileName) => {
        setMessage("文件上传成功");
        const newConfig = _.cloneDeep(config ?? {});
        _.set(newConfig, field, fileName);
        return setConfigMutation.mutateAsync(newConfig);
      })
      .catch(() => {
        setMessage("文件上传失败");
      })
      .finally(() => {
        refetch();
      });
  };

  return (
    <Box>
      <FormHelperText>
        <h2>{label}</h2>
      </FormHelperText>
      <Box
        border={"2px dashed grey"}
        sx={{
          width: "500px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleFileClick}
      >
        <Document file={pdf}>
          <Page pageNumber={1} width={200} height={500} />
        </Document>
      
      </Box>

      <FormControl variant="standard">
        {/* <Input
          type="file"
          componentsProps={{ input: { accept: ".pdf" } }}
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            handleUpload(file);
          }}
        /> */}
        <FormHelperText>点击虚线区域选择pdf文件或拖拽pdf文件到上框</FormHelperText>
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
