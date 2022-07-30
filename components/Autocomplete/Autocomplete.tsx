import { Chip, TextField, Autocomplete as AutocompleteMaterial } from "@mui/material";

import { AutocompleteProps } from "./Autocomplete.props";

export const Autocomplete = (props: AutocompleteProps): JSX.Element => {
  const { options, label, placeholder = "", renderInput, ...restProps } = props;

  const id = (Math.random() + 1).toString(36).substring(7);

  return (
    <AutocompleteMaterial
      multiple
      id={id}
      options={options}
      getOptionLabel={(option) => option.label}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.label}
            {...getTagProps({ index })}
            // disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
        />
      )}
      {...restProps}
    />
  );
};
