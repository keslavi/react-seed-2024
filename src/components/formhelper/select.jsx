import React, { useCallback, useMemo } from "react";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { TextField as MuiTextField, Select as MuiSelect } from "@mui/material";

import { ColPadded } from "@/components/grid";

export const Select = React.memo((props) => {
  // Memoize placeholder function to prevent recreation on every render
  const fnPlaceholder = useCallback((e) => {
    return;
  }, []);

  // Memoize event handlers to prevent recreation on every render
  const onBlur = useCallback(props.onBlur || fnPlaceholder, [props.onBlur, fnPlaceholder]);
  const onChange = useCallback(props.onChange || fnPlaceholder, [props.onChange, fnPlaceholder]);

  const { field, error } = useFormField(props);

  // Memoize options rendering to prevent recalculation on every render
  const renderedOptions = useMemo(() => {
    return props.options?.map((x) => (
      <option key={x.key} value={x.key}>
        {x.text}
      </option>
    )) || [];
  }, [props.options]);

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

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        id={field.name}
        name={field.name}
        label={props.label}
        fullWidth
        select
        slotProps={{
          select: {
            native: true,
          },
        }}
        onBlur={handleBlur}
        onChange={handleChange}
        value={field.value || ""}
        {...errorProps}
        {...cleanParentProps(props)}
      >
        {renderedOptions}
      </MuiTextField>
    </ColPadded>
  );
});

// Add display name for better debugging
Select.displayName = 'Select';
