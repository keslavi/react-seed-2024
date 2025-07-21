import {memo, useCallback, useMemo } from "react";
import { /* InputAdornment, */ TextField as MuiTextField } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";
//import { color } from "@/theme-material";

export const TextField = memo((props) => {
  const { 
    field, 
    //error, 
    errorMui, 
    valueProp,
  } = useFormField(props);

  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, [field]);

  const onChange = useCallback((e) => {
    field.onChange(e.target.value);
    props.onChange?.(e);
  }, [field]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        fullWidth
        id={field.name}
        name={field.name}
        label={props.label}
        inputRef={field.ref}
        onBlur={onBlur}
        onChange={onChange}
        {...cleanParentProps(props)}
        {...valueProp}
        {...errorMui}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
    </ColPadded>
  );
});

// Add display name for better debugging
TextField.displayName = 'TextField';
