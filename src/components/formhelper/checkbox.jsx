import { memo, useCallback, useMemo } from "react";
import {
  Checkbox as MuiCheckbox,
  FormControlLabel as MuiFormControlLabel,
  Typography,
  FormHelperText,
} from "@mui/material";

import { useFormField } from "./form-provider";
import { color } from "@/theme-material";
import { cleanParentProps, colProps } from "./helper";
import { ColPadded } from "@/components/grid";
import { isTruthy } from "helpers";

export const Checkbox = memo((props) => {
  const variant = props.variant || "";

  const { field, errorMui } = useFormField(props);

  const isChecked = useCallback(() => {
    const v = field.value;
    return isTruthy(v);
  }, [field.value]);

  // Memoize label rendering to prevent recalculation on every render
  const label = useMemo(() => {
    let labelText = props.label || "";
    
    switch (variant) {
      case "h1":
        return (
          <Typography
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              color: color.primary.blue,
            }}
          >
            {labelText}
          </Typography>
        );
      case "h2":
        return (
          <Typography style={{ fontWeight: "400", color: color.primary.blue }}>
            {labelText}
          </Typography>
        );
      case "h3":
        return (
          <Typography
            style={{
              fontSize: ".8rem",
              fontWeight: "300",
              color: color.primary.blue,
            }}
          >
            {labelText}
          </Typography>
        );
      default:
        return labelText;
    }
  }, [props.label, variant]);

  const checked = isChecked();

  const onChange = useCallback((e) => {
    field.onChange(e.target.checked);
    props.onChange?.(e);
  }, [field, props]);

  const onBlur = useCallback((e) => {
    field.onBlur(e.target.checked);
    props.onBlur?.(e);
  }, [field, props]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiFormControlLabel
        control={
          <MuiCheckbox
            id={field.name}
            name={field.name}
            onChange={onChange}
            onBlurCapture={onBlur}
            checked={checked}
            color="success"
            {...cleanParentProps(props)}
          />
        }
        label={label}
        style={{ marginLeft: 0 }}
      />
      {errorMui?.helperText && (
        <FormHelperText className="Mui-error">{errorMui.helperText}</FormHelperText>
      )}
    </ColPadded>
  );
});

// Add display name for better debugging
Checkbox.displayName = 'Checkbox';
