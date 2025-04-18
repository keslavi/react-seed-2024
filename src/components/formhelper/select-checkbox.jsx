import { cleanParentProps, colProps } from "./helper";
import { useController } from "react-hook-form";
import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  InputLabel,
  FormControl,
  FormHelperText,
  OutlinedInput
} from "@mui/material";

import { ColPadded } from "@/components/grid";

export const SelectCheckbox = (props) => {
  const {
    field,
    fieldState: { error },
  } = useController({ ...props });

  const options = props.optionscheckbox || [];

  const placeholder = () => {};
  const onBlur = props.onBlur || placeholder;
  const onChange = props.onChange || placeholder;

  const onChangeLocal = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === 'string' ? value.split(',') : value;
    field.onChange(newValue);
    onChange(event);
  };

  const getSelectedLabels = (selected) => {
    return selected.map((val) => {
      const option = options.find((opt) => opt.key === val);
      return option ? option.text : val;
    });
  };

  return (
    <ColPadded {...colProps(props)}>
      <FormControl fullWidth error={!!error}>
        <InputLabel id={`${field.name}-label`}>{props.label}</InputLabel>
        <MuiSelect
          labelId={`${field.name}-label`}
          id={field.name}
          name={field.name}
          multiple
          value={field.value || []}
          input={<OutlinedInput label={props.label} />}
          renderValue={(selected) => getSelectedLabels(selected).join(", ")}
          onBlur={(e) => {
            field.onBlur(e);
            onBlur(e);
          }}
          onChange={onChangeLocal}
          {...cleanParentProps(props)}
        >
          {options.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              <Checkbox checked={(field.value || []).includes(option.key)} />
              <ListItemText sx={{ ml: 1 }} primary={option.text} />
            </MenuItem>
          ))}
        </MuiSelect>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    </ColPadded>
  );
};
