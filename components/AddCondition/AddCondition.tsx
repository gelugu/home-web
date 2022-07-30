import { Grid, Button } from "@mui/material";

import { AddConditionProps } from "./AddCondition.props";
import { Input } from "..";
import { rulesText } from "../../text";
import { Spacer } from "../Spacer/Spacer";

export const AddCondition = (props: AddConditionProps): JSX.Element => {
  const {
    code,
    setCode,
    remove,
    allowRemove,
    disabled = false
  } = props;

  return (
    <Grid container spacing={3}>
      <Spacer xs={1} />
      <Grid item xs={10}>
        <Input
          label={rulesText.codeConditionsLabel}
          required
          disabled={disabled}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </Grid>
      <Grid item xs={1}>
        <Button disabled={allowRemove || disabled} onClick={() => remove()}>Удалить</Button>
      </Grid>
    </Grid>
  );
};
