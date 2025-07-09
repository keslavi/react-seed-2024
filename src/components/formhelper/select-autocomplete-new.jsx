import { useMemo, useCallback } from "react";
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
  const unbound = props.unbound === "true" ? true : false;

  // Handle placeholder logic like the original version
  const placeholder = props.placeholder === undefined ? "Please Select" : props.placeholder;

  // Use common hook for both patterns
  const { field, error } = useFormField(props);

  let valueProp = {};
  if (!props.defaultvalue) {
    if (!unbound) {
      valueProp = {
        value: field.value || null,
      };
    }
  }

  const options = useMemo(() => props.options || [], [props.options]);

  // Memoized event handlers for better performance
  const handleBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    if (props.onBlur) {
      props.onBlur(e);
    }
  }, [field, props.onBlur]);

  const handleChange = useCallback((event, newValue) => {
    field.onChange(newValue);
    if (props.onChange) {
      props.onChange(event);
    }
  }, [field, props.onChange]);

  // Memoized option handlers for better performance
  const getOptionLabel = useCallback((option) => option.text || option.label || "", []);
  const isOptionEqualToValue = useCallback((option, value) => 
    option.key == value?.key || option.value == value?.value, []);

  return (
    <ColPadded {...colProps(props)}>
      <Box sx={{ position: 'relative' }}>
        <MuiAutocomplete
          id={field.name}
          name={field.name}
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          onBlur={handleBlur}
          onChange={handleChange}
          {...valueProp}
          {...cleanParentProps(props)}
          renderInput={(params) => {
            return (
              <Box sx={{ position: 'relative' }}>
                <MuiTextField
                  {...params}
                  label={props.label}
                  placeholder={placeholder}
                  error={!!error}
                  helperText={error?.message}
                />
                {props.info && <Info id={`${field.id}Info`} info={props.info} />}
              </Box>
            );
          }}
        />
      </Box>
    </ColPadded>
  );
};