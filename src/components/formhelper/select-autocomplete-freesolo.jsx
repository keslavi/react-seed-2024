import { useMemo, useState } from "react";
import { useFormField } from "./form-provider";

import {
  Box,
  TextField as MuiTextField,
  Autocomplete as MuiAutocomplete,
} from "@mui/material";

import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";

import { ColPadded } from "@/components/grid";
import { KeyboardArrowDown } from "@mui/icons-material";

export const SelectAutocompleteFreesolo = (props) => {
  const [inputValue, setInputValue] = useState('');
  const onChange = props.onChange || (() => {});
  const options = useMemo(() => props.options || [], [props.options]);

  const { field, error } = useFormField(props);

  // Memoize error props to prevent object recreation
  const errorProps = useMemo(() => {
    // Form field error takes precedence over directly passed error prop
    const hasFormError = !!error;
    const directError = props.error;
    
    return {
      error: hasFormError || !!directError || undefined,
      helperText: hasFormError ? error?.message : (directError?.message || directError)
    };
  }, [error, props.error]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiAutocomplete
        id={field.name}
        name={field.name}
        options={options}
        freeSolo={true}
        getOptionLabel={(option) => {
          // Handle both string and object options
          if (typeof option === 'string') {
            return option;
          }
          return option.text || option.songname || "";
        }}
        onChange={(event, newValue) => {
          // Handle both selected option and free text input
          if (typeof newValue === 'string') {
            // Free text input
            field.onChange(newValue);
            onChange(event, { songname: newValue, isCustom: true });
          } else if (newValue && newValue.key) {
            // Selected from dropdown
            field.onChange(newValue.songname);
            onChange(event, newValue);
          } else {
            // No value
            field.onChange('');
            onChange(event, null);
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        inputValue={inputValue}
        onBlur={field.onBlur}
        value={field.value || ''}
        fullWidth
        popupIcon={<KeyboardArrowDown />}
        renderInput={(params) => {
          return (
            <Box sx={{position:'relative'}}>
              <MuiTextField
                {...params}
                label={props.label}
                placeholder={props.placeholder}
                {...errorProps}
              />
              {props.info && <Info id={`${field.id}Info`} info={props.info} />}
            </Box>
          );
        }}
        {...cleanParentProps(props)}
      />
    </ColPadded>
  );
};