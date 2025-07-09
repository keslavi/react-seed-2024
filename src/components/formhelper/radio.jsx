import React, { useCallback, useMemo } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup,
} from "@mui/material";
import { cleanParentProps, colProps } from "./helper";

import { useFormField } from "./form-provider";

import { ColPadded } from "components/grid";

export const Radio = React.memo((props) => {
  const options = props.optionsRadio;
  
  // Memoize placeholder function to prevent recreation on every render
  const placeholder = useCallback((e) => {
    return;
  }, []);
  
  // Memoize event handler to prevent recreation on every render
  const onChange = useCallback(props.onChange || placeholder, [props.onChange, placeholder]);

  const { field, error } = useFormField(props);

  // Memoize options rendering to prevent recalculation on every render
  const renderedOptions = useMemo(() => {
    return options?.map((x) => (
      <FormControlLabel
        key={x.key}
        value={x.value}
        control={<MuiRadio />}
        label={<>{x.text}&nbsp;&nbsp;&nbsp;&nbsp;</>}
      />
    )) || [];
  }, [options]);

  // Memoize event handler to prevent recreation on every render
  const handleChange = useCallback((e) => {
    field.onChange(e.target.value);
    onChange(e);
  }, [field, onChange]);

  return (
    <ColPadded {...colProps(props)}>
      <FormControl>
        {props.label && <FormLabel>{props.label}</FormLabel>}
        <RadioGroup
          id={field.name}
          name={field.name}
          row={props.row}
          label={props.label}
          onBlur={field.onBlur}
          onChange={handleChange}
          value={field.value || ""}
        >
          {renderedOptions}
        </RadioGroup>
      </FormControl>
    </ColPadded>
  );
});

// Add display name for better debugging
Radio.displayName = 'Radio';
