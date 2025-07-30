import React, { useCallback, useMemo } from "react";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Info } from "./info";

import { ColPadded } from "@/components/grid";

export const Select = React.memo((props) => {
  // Memoize placeholder function to prevent recreation on every render

  const { field, error } = useFormField(props);

  const renderedOptions = useMemo(() => {
    return props.options?.map((x) => (
      <MenuItem key={x.key} value={x.key}>
        {x.text}
      </MenuItem>
    )) || [];
  }, [props.options]);

  // Memoize event handlers to prevent recreation on every render
  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, []);

  const onChange = useCallback((e) => {
    field.onChange(e.target.value);
    props.onChange?.(e);
  }, []);

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
      <FormControl fullWidth error={errorProps.error}>
        <InputLabel id={`${field.name}-label`}>{props.label}</InputLabel>
        <MuiSelect
          labelId={`${field.name}-label`}
          id={field.name}
          name={field.name}
          label={props.label}
          onBlur={onBlur}
          onChange={onChange}
          value={field.value || ""}
          displayEmpty
          renderValue={(selected) => {
            if (!selected || selected === "") {
              // Use the provided placeholder or fall back to a generic one
              return <span style={{ color: '#666' }}>{props.placeholder || "Please Select"}</span>;
            }
            const selectedOption = props.options?.find(option => 
              String(option.key) === String(selected)
            );
            return selectedOption ? selectedOption.text : selected;
          }}
          // Add aria-label to the popup indicator for testing
          IconComponent={(props) => (
            <span {...props} aria-label="open" />
          )}
          {...cleanParentProps(props)}
        >
          {renderedOptions}
        </MuiSelect>
        {errorProps.helperText && (
          <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>
            {errorProps.helperText}
          </div>
        )}
      </FormControl>
      {props.info && <Info id={`${field.name}Info`} info={props.info} />}
    </ColPadded>
  );
});

// Add display name for better debugging
Select.displayName = 'Select';
