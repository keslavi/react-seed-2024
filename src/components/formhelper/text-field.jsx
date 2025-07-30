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
  }, []);

  const onChange = useCallback((e) => {
    field.onChange(e.target.value);
    props.onChange?.(e);
  }, []);

  // Extract input-specific props that need to be passed to the input element
  const inputProps = useMemo(() => {
    const {
      readOnly,
      maxLength,
      minLength,
      pattern,
      autoFocus,
      spellCheck,
      inputMode,
      autoComplete,
      ...restProps
    } = props;

    return {
      readOnly,
      maxLength,
      minLength,
      pattern,
      spellCheck,
      inputMode,
      autoComplete,
      autoFocus: props.autoFocus,
    };
  }, [props]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        fullWidth
        id={field.name}
        name={field.name}
        label={props.label}
        {...(props.placeholder && { placeholder: props.placeholder })}
        inputRef={field.ref}
        onBlur={onBlur}
        onChange={onChange}
        autoFocus={props.autoFocus}
        {...cleanParentProps(props)}
        {...valueProp}
        {...errorMui}
        inputProps={inputProps}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
    </ColPadded>
  );
});

// Add display name for better debugging
TextField.displayName = 'TextField';
