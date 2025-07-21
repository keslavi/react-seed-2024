import React, { useCallback, useMemo, useState } from "react";
import { TextField as MuiTextField, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";

export const Password = React.memo((props) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Memoize placeholder function to prevent recreation on every render
  const placeholder = useCallback((e) => {
    return;
  }, []);
  
  // Memoize event handlers to prevent recreation on every render
  const onBlur = useCallback(props.onBlur || placeholder, [props.onBlur, placeholder]);
  const onChange = useCallback(props.onChange || placeholder, [props.onChange, placeholder]);
  
  const unbound = props.unbound === "true" ? true : false;

  // Use common hook for both patterns
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
    onBlur(e);
  }, [field, onBlur]);

  const handleChange = useCallback((e) => {
    field.onChange(e.target.value);
    onChange(e);
  }, [field, onChange]);

  // Memoize error props to prevent object recreation
  const errorProps = useMemo(() => ({
    error: !!error || undefined,
    helperText: error?.message
  }), [error]);

  // Handle show/hide password toggle
  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <ColPadded {...colProps(props)}>
      <Box sx={{ position: 'relative' }}>
        <MuiTextField
          fullWidth
          type={showPassword ? 'text' : 'password'}
          id={field.name}
          name={field.name}
          label={props.label}
          inputRef={field.ref}
          onBlur={handleBlur}
          onChange={handleChange}
          {...valueProp}
          {...errorProps}
          {...cleanParentProps(props)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {props.info && <Info id={`${field.id}Info`} info={props.info} />}
      </Box>
    </ColPadded>
  );
});

// Add display name for better debugging
Password.displayName = 'Password';

export default Password; 