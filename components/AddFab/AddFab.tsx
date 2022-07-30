import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { AddFabProps } from "./AddFab.props";

export const AddFab = ({ href }: AddFabProps): JSX.Element => {
  return (
    <Fab
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      color="primary"
      aria-label="add"
      href={href}
    >
      <AddIcon />
    </Fab>
  );
};
