import { Grid, Typography, SxProps, Theme, Paper } from "@mui/material";
import { useCallback } from "react";

import { TableProps } from "./Table.props";

export const Table = (props: TableProps): JSX.Element => {
  const { name, columns, rows } = props;

  const renderRows = useCallback(() => {
    return rows.map(({ values, key }) => (
      <Grid item xs={12} key={key}>
        <Grid container spacing={2}>
          {values.map((value, index) => (
            <Grid item xs={columns[index].size} key={`${key}-${index}`}>
              <Paper elevation={1} sx={cellStyle}>
                {value}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    ));
  }, [rows, columns]);

  const tableHeaderStyle: SxProps<Theme> = { textAlign: "center" };

  const tableStyle: SxProps<Theme> = { mt: 2 };

  const headerCellStyle: SxProps<Theme> = {
    textTransform: "uppercase",
    textAlign: "center",
    padding: 1,
    mb: 1,
    borderRadius: 2,
    color: "inherit",
  };

  const cellStyle: SxProps<Theme> = {
    padding: 2,
    borderRadius: 2,
    borderColor: "ActiveBorder",
    height: "100%",
  };

  return (
    <Grid container spacing={1} sx={tableStyle}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={tableHeaderStyle}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {columns.map((header) => (
            <Grid key={header.key} item xs={header.size}>
              <Paper elevation={4} sx={headerCellStyle}>
                {header.value}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {renderRows()}
    </Grid>
  );
};
