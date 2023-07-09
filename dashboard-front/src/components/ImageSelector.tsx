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

export function ImageSelector(props: { field: string; label: string }) {
  const { field, label } = props;
  const { data: config, refetch } = useConfig();
  const setConfigMutation = useMutation(setConfig);
  const [message, setMessage] = useState<string>();
  const uploadMutation = useMutation(upload);

  const img = useMemo(
    () => getFileURL(_.get(config, field) as string),
    [config, field]
  );
  return (
    <Box>
      <Box sx={{ width: "300px", height: "300px" }}>
        <img alt="" style={{ width: "100%", height: "100%" }} src={img} />
      </Box>
      <FormControl variant="standard">
        <Input
          type="file"
          componentsProps={{ input: { accept: ".jpg,.png" } }}
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            uploadMutation
              .mutateAsync(file)
              .then((fileName) => {
                setMessage("图片更新成功");
                const newConfig = _.cloneDeep(config ?? {});
                _.set(newConfig, field, fileName);
                return setConfigMutation.mutateAsync(newConfig);
              })
              .catch(() => setMessage("图片更新失败"))
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
