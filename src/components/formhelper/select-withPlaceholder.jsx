import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { TextField as MuiTextField } from "@mui/material";

import { ColPadded } from "@/components/grid";

export const Select = (props) => {
  const options = props.options;

  const { field, error } = useFormField(props);

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
        onBlur={(e) => {
          field.onBlur(e.target.value);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          field.onChange(e.target.value);
          props.onChange?.(e);
        }}
        value={field.value || ""}
        {...{ error: !!error || undefined, helperText: error?.message }}
        {...cleanParentProps(props)}
      >
        {options.map((x) => (
          <option key={x.key} value={x.key}>
            {x.text}
          </option>
        ))}
      </MuiTextField>
    </ColPadded>
  );
};

Select.displayName = 'SelectWithPlaceholder';
