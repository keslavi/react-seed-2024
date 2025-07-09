import React, { useCallback, useMemo, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { useFormField } from "./form-provider";
import { ColPadded } from "@/components/grid";
// import { Help } from "@mui/icons-material";
// import { color } from "@/theme-material";

export const SelectMulti = React.memo((props) => {
  const {
    optionsMulti: options,
    unbound = props.unbound === "true",
    label,
    info,
    defaultvalue,
    ...restProps
  } = props;

  // Memoize placeholder function to prevent recreation on every render
  const fnPlaceholder = useCallback((e) => {
    return;
  }, []);

  // Use the same pattern as select-autocomplete for better performance
  const onBlur = props.onBlur || fnPlaceholder;
  const onChange = props.onChange || fnPlaceholder;

  const { field, error } = useFormField(props);

  // Handle placeholder logic like select-autocomplete
  const placeholder = props.placeholder === undefined ? "Please Select" : props.placeholder;

  // State to manage input value for placeholder visibility
  const [inputValue, setInputValue] = useState("");

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

  // Memoize event handlers to prevent recreation on every render
  const handleBlur = useCallback(() => {
    field.onBlur();
    onBlur();
  }, [field, onBlur]);

  const handleChange = useCallback((e, newValue) => {
    const selectedValues = Array.isArray(newValue)
      ? newValue.map((item) => item.key)
      : [];
    field.onChange(selectedValues);
    onChange(selectedValues);
  }, [field, onChange]);

  // Handle input change to manage placeholder visibility
  const handleInputChange = useCallback((event, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

  // Show placeholder when no options are selected and input is empty
  const shouldShowPlaceholder = selectedOptions.length === 0 && inputValue === "";

  return (
    <ColPadded {...colProps(props)}>
      <Autocomplete
        id={field.name}
        multiple
        onBlur={handleBlur}
        onChange={handleChange}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        options={filteredOptions}
        getOptionLabel={(option) => option?.text || ""}
        isOptionEqualToValue={(option, value) => option?.key == value?.key}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={field.ref}  // Moved inputRef here
            label={label}
            placeholder={shouldShowPlaceholder ? placeholder : ""}
            variant="outlined"
            error={Boolean(error)}
            helperText={error?.message || ""}
          />
        )}
        value={selectedOptions}
        {...cleanParentProps(restProps)}
      />
      {info && <Info id={`${field.id}Info`} info={info} />}
    </ColPadded>
  );
});

// Add display name for better debugging
SelectMulti.displayName = 'SelectMulti';