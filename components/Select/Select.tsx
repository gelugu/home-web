import { MenuItem, Select as MaterialSelect, InputLabel } from "@mui/material";

import { SelectProps } from "./Select.props";

export const Select = (props: SelectProps): JSX.Element => {
  const { options, label, multiple = true, ...restProps } = props;

  const id = (Math.random() + 1).toString(36).substring(7);

  return (
    <>
      <InputLabel id={`${id}-multiple-chip-label`}>{label}</InputLabel>
      <MaterialSelect
        labelId={`${id}-multiple-chip-label`}
        multiple={multiple}
        fullWidth
        {...restProps}
      >
        {options
          .filter(({ hidden }) => !hidden)
          .map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.fixed}
            >
              {option.label}
            </MenuItem>
          ))}
      </MaterialSelect>
    </>
  );
};

export * from "./Select.props";
