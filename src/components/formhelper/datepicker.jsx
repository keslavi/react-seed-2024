import React, { useCallback, useMemo } from "react";
import { TextField as MuiTextField } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";

import { useFormField } from "./form-provider";

import { ColPadded } from "components/grid";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

export const Datepicker = React.memo((props) => {
  // Memoize placeholder function to prevent recreation on every render
  const placeholder = useCallback((e) => {
    return;
  }, []);
  
  // Memoize event handler to prevent recreation on every render
  const onChange = useCallback(props.onChange || placeholder, [props.onChange, placeholder]);

  const { field, error } = useFormField(props);

  // Memoize attributes to prevent object recreation on every render
  const attributes = useMemo(() => {
    const attrs = { inputProps: {} };
    if (!isEmpty(props.min)){
      attrs.inputProps.min = dayjs(props.min).format('YYYY-MM-DD');
    }
    if (!isEmpty(props.max)){
      attrs.inputProps.max = dayjs(props.max).format('YYYY-MM-DD');
    }
    return attrs;
  }, [props.min, props.max]);

  // Memoize event handler to prevent recreation on every render
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
      <MuiTextField
        {...cleanParentProps(props)}
        type="date"
        id={field.name}
        label={props.label}
        inputRef={field.ref}
        onBlur={field.onBlur}
        onChange={handleChange}
        value={field.value || ''} //avoid uncontrolled ref error
        {...attributes} //note.. NOT <Input {...attributes} /> :)
        fullWidth
        {...errorProps}
      />
    </ColPadded>
  )

});

// Add display name for better debugging
Datepicker.displayName = 'Datepicker';
