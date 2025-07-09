import React, { useCallback, useMemo } from "react";
import { /* InputAdornment, */ TextField as MuiTextField } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";
//import { BootstrapTooltip } from "./infotooltip";
import { Help /*HelpOutline*/ as Help } from "@mui/icons-material";
import { color } from "@/theme-material";
import { use } from "react";

export const TextField = React.memo((props) => {
  // Memoize placeholder function to prevent recreation on every render
  const placeholder = useCallback((e) => {
    return;
  }, []);

  // Memoize event handlers to prevent recreation on every render
  const onBlur = useCallback(props.onBlur || placeholder, [props.onBlur, placeholder]);
  const onChange = useCallback(props.onChange || placeholder, [props.onChange, placeholder]);
  
  const unbound = props.unbound === "true" ? true : false;

  const { field, error } = useFormField(props);
  //fieldstate{error, invalid, isTouched, isDirty, }

  let valueProp = {};
  if (!props.defaultvalue) {
    if (!unbound) {
      valueProp = {
        value: field.value || "",
      };
    }
  }

  // Memoize event handlers to prevent recreation on every render
  const handleBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    onBlur(e);
  }, [field, onBlur]);

  const handleChange = useCallback((e) => {
    field.onChange(e.target.value);
    onChange(e);
  }, [field, onChange]);

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
      <MuiTextField
        fullWidth
        id={field.name}
        name={field.name}
        label={props.label}
        inputRef={field.ref}
        onBlur={handleBlur}
        onChange={handleChange}
        {...cleanParentProps(props)}
        {...valueProp}
        {...errorProps}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
      {/* {props.info &&  Info(`${field.id}Info`, props.info)}       */}
    </ColPadded>
  );
});

// Add display name for better debugging
TextField.displayName = 'TextField';
