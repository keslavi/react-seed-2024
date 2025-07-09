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

export const SelectAutocomplete = (props) => {
  const fnPlaceholder = (e) => {
    return;
  };

  const onChange = props.onChange || fnPlaceholder;
  const options = useMemo(() => props.options || [], [props.options]);
  const { field, error } = useFormField(props);
  const [isCleared, setIsCleared] = useState(!field.value);

  const placeholder=props.placeholder===undefined ? "Please Select" : props.placeholder;

  // Find the selected option only if field.value exists and is not undefined
  const selectedOption = useMemo(() => {
    if (isCleared || field.value === undefined || field.value === null || field.value === "") {
      return null;
    }
    return options.find(option => option.key == field.value) || null;
  }, [field.value, options, isCleared]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiAutocomplete
        id={field.name}
        name={field.name}
        options={options}
        getOptionLabel={(option) => option?.text || ""}
        onChange={(event, newValue) => {
          if (newValue) {
            setIsCleared(false);
            field.onChange(newValue.key);
          } else {
            setIsCleared(true);
            field.onChange(undefined);
          }
          onChange(event, newValue);
        }}
        onBlur={field.onBlur}
        value={selectedOption}
        fullWidth
        popupIcon={<KeyboardArrowDown />}
        renderInput={(params) => {
          return (
            <Box xs={{position:'relative'}}>
              <MuiTextField
                {...params}
                label={props.label}
                placeholder={placeholder}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  shrink: true
                }}
                {...{ error: !!error || undefined, helperText: error?.message }}
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