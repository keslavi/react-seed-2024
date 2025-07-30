import { memo, useCallback, useState } from "react";
import { TextField as MuiTextField, IconButton, InputAdornment } from "@mui/material";
import IconVisibility from "@mui/icons-material/Visibility";
import IconVisibilityOff from "@mui/icons-material/VisibilityOff";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";

export const Password = memo((props) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const { 
    field, 
    errorMui, 
    valueProp,
  } = useFormField(props);

  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, [field, props]);

  const onChange = useCallback((e) => {
    field.onChange(e.target.value);
    props.onChange?.(e);
  }, [field, props]);

  const onClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        id={field.name}
        name={field.name}
        label={props.label}
        inputRef={field.ref}
        onBlur={onBlur}
        onChange={onChange}
        {...cleanParentProps(props)}
        {...valueProp}
        {...errorMui}
        slots={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onClickShowPassword}
                onMouseDown={onMouseDownPassword}
                edge="end"
              >
                {showPassword ? <IconVisibilityOff /> : <IconVisibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
    </ColPadded>
  );
});

Password.displayName = 'Password';

export default Password; 