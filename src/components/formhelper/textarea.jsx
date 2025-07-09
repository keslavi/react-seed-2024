import React, { useCallback, useMemo } from "react";
import { useFormField } from "./form-provider";
//const {field,fieldState:{error}}=useController(props);

import { 
  TextareaAutosize,
  InputLabel,
  FormHelperText, 
  Link,
} from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { ColPadded } from "components/grid";

export const Textarea = React.memo((props) => {
  // Memoize placeholder function to prevent recreation on every render
  const placeholder = useCallback((e) => {return}, []);
  
  // Memoize event handlers to prevent recreation on every render
  const onBluer = useCallback(props.onBlur || placeholder, [props.onBlur, placeholder]);
  const onChange = useCallback(props.onChange || placeholder, [props.onChange, placeholder]);
  
  const unbound = props.unbound === "true" ? true : false;
  const { field, error } = useFormField(props);

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
    onBluer(e);
  }, [field, onBluer]);

  const handleChange = useCallback((e) => {
    field.onChange(e.target.value);
    onChange(e);
  }, [field, onChange]);

  // Memoize error props to prevent object recreation
  const errorProps = useMemo(() => ({
    error: !!error || undefined,
    helperText: error?.message
  }), [error]);

  return (
    <ColPadded {...colProps(props)}>
      <InputLabel htmlFor={field.name}>{props.label}</InputLabel>
      <TextareaAutosize
        style={{width: "100%"}}
        id={field.name}
        name={field.name}
        // minRows={3}
        // maxRows={6}
        ref={field.ref}
        onBlur={handleBlur}
        onChange={handleChange}
        {...valueProp}
        {...errorProps}
        {...cleanParentProps(props)}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
      {props.helperText && <FormHelperText error>{error?.message}</FormHelperText>}
    </ColPadded>
  );

});

// Add display name for better debugging
Textarea.displayName = 'Textarea';
