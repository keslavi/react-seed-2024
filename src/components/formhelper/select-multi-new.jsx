import { TextField, Autocomplete } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { useFormField } from "./form-provider";
import { ColPadded } from "@/components/grid";
// import { Help } from "@mui/icons-material";
// import { color } from "@/theme-material";
import { useMemo } from "react";

export const SelectMulti = (props) => {
  const {
    optionsMulti: options,
    onBlur = () => {},
    onChange = () => {},
    unbound = props.unbound === "true",
    label,
    info,
    defaultvalue,
    placeholder,
    ...restProps
  } = props;

  // Handle placeholder logic like select-autocomplete
  const placeholderText = placeholder === undefined ? "Please Select" : placeholder;

  // Use common hook for both patterns like select-autocomplete
  const { field, error } = useFormField(props);

  const selectedOptions = useMemo(() => {
    return Array.isArray(field.value)
      ? options.filter((opt) => field.value.includes(opt.key))
      : [];
  }, [field.value, options]);

  //  Filter out already selected options from dropdown
  const filteredOptions = useMemo(() => {
    // Handle cases where field.value might be undefined or null
    const keys = field.value ? field.value.map(val => val.key) : [];
    
    return options.filter(option => 
      !keys.includes(option.key)
    );
  }, [field.value, options]);

  // Handle value prop conditionally based on unbound state
  let valueProp = {};
  if (!defaultvalue) {
    if (!unbound) {
      valueProp = {
        value: selectedOptions,
      };
    }
  }

  return (
    <ColPadded {...colProps(props)}>
      <Autocomplete
        id={field.name}
        multiple
        onBlur={() => {
          field.onBlur();
          onBlur();
        }}
        onChange={(e, newValue) => {
          const selectedValues = Array.isArray(newValue)
            ? newValue.map((item) => item.key)
            : [];
          field.onChange(selectedValues);
          onChange(selectedValues);
        }}
        options={filteredOptions}
        getOptionLabel={(option) => option?.text || ""}
        isOptionEqualToValue={(option, value) => option?.key == value?.key}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={field.ref}  // Moved inputRef here
            label={label}
            placeholder={placeholderText}
            variant="outlined"
            error={Boolean(error)}
            helperText={error?.message || ""}
          />
        )}
        {...valueProp}
        {...cleanParentProps(restProps)}
      />
      {info && <Info id={`${field.id}Info`} info={info} />}
    </ColPadded>
  );
};