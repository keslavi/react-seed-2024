
import { useCallback, memo } from "react";
import {
  Radio as MuiRadio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText
} from "@mui/material";
 
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { useFormField } from "./form-provider";
 
import { ColPadded } from "@/components/grid";
 
export const Radio = memo((props) => {
  const label = props.label || '';
  const options = props.optionsRadio;
 
  const {
    field,
    error,
    //errorMui,
    valueProp
  } = useFormField(props/*might be {...props}*/);
 
  // Memoize event handlers to prevent recreation on every render
  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, [field]);
 
  const onChange = useCallback((e) => {
    field.onChange(e.target.value);
    props.onChange?.(e);
  }, [field]);
  //TODO: Get select-autocomplete working and switch out.
  return (
    <ColPadded {...colProps(props)}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        {/* {errorMui && <FormHelperText className="Mui-error">{errorMui.message}</FormHelperText>} */}
        {error && <FormHelperText className="Mui-error">{error.message}</FormHelperText>}
 
        {/* {props.helperText && <FormHelperText className="Mui-error">{props.helperText}</FormHelperText>} */}
        <RadioGroup
          row={props.row}
          id={field.name}
          name={field.name}
          label={props.label || ''}
          onBlur={onBlur}
          onChange={onChange}
          {...valueProp}
          {...cleanParentProps(props)}
        >
          {options.map((x) => {
            return <FormControlLabel
              key={x.key}
              value={x.key}
              control={<MuiRadio
              />}
              label={<>&nbsp;{x.text}&nbsp;&nbsp;&nbsp;&nbsp;</>}
              disabled={field.disabled || false}
            />;
          })}
        </RadioGroup>
      </FormControl>
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
    </ColPadded >
  );
});


// Add display name for better debugging
Radio.displayName = 'Radio';
