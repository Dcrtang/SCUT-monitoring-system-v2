import { colors, Typography } from "@mui/material";
import React from "react";

export function Text({
  children: text,
  whitespace = true,
}: {
  children?: string;
  whitespace?: boolean;
}) {
  const children = whitespace
    ? text
      ?.replaceAll(" ", "\u00A0")
      .split("\n")
      .map((row, index) => (
        <React.Fragment key={index}>
          {row}
          <br />
        </React.Fragment>
      ))
    : text;
  return (
    <Typography
      component="div"
      sx={{
        backgroundColor: colors.grey[100],
        margin: "12px 0",
        padding: "6px",
        borderRadius: "6px",
        border: `1px solid ${colors.grey[300]}`,
        fontSize: "18px",
      }}
    >
      {children}
    </Typography>
  );
}
