import { Snackbar, TextField } from "@mui/material";
import { setConfig, useConfig } from "../api";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { useMutation } from "react-query";

export function AutoTextField(props: {
  field: string;
  label: string;
  fullwidth?: boolean;
  multiline?: boolean;
}) {
  const { field, label, fullwidth = false, multiline = false } = props;
  const { data: config, refetch } = useConfig();
  const [value, setValue] = useState("");
  const setConfigMutation = useMutation(setConfig);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    setValue(_.get(config, field) as string);
  }, [config, field]);

  useDebounce(
    () => {
      // update config
      if (_.get(config, field) === value) {
        return;
      }
      const newConfig = _.cloneDeep(config ?? {});
      _.set(newConfig, field, value);
      setConfigMutation
        .mutateAsync(newConfig)
        .then(() => {
          setMessage("更新字段成功");
        })
        .catch(() => {
          alert(field);
          setMessage("更新字段失败");
        })
        .finally(() => {
          refetch();
        });
    },
    1000,
    [value]
  );
  return (
    <>
      <TextField
        label={label}
        fullWidth={fullwidth}
        multiline={multiline}
        variant="standard"
        value={value ?? ""}
        onChange={(e) => {
          setValue(e.target.value);
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
    </>
  );
}
