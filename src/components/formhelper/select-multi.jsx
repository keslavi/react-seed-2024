import React, { useCallback, useMemo, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { useFormField } from "./form-provider";
import { ColPadded } from "@/components/grid";


export const SelectMulti = React.memo((props) => {
  const {
    optionsMulti: options,
    unbound = props.unbound === "true",
    label,
    info,
    defaultvalue,
    ...restProps
  } = props;

  const fnPlaceholder = useCallback((e) => {
    return;
  }, []);

  const onBlur = props.onBlur || fnPlaceholder;
  const onChange = props.onChange || fnPlaceholder;

  const { field, error } = useFormField(props);

  const placeholder = props.placeholder === undefined ? "Please Select" : props.placeholder;

  const [inputValue, setInputValue] = useState("");

  const selectedOptions = useMemo(() => {
    return Array.isArray(field.value)
      ? options.filter((opt) => field.value.includes(opt.key))
      : [];
  }, [field.value, options]);

  const filteredOptions = useMemo(() => {
    const keys = field.value ? field.value.map(val => val.key) : [];
    
    return options.filter(option => 
      !keys.includes(option.key)
    );
  }, [field.value, options]);

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

  const handleInputChange = useCallback((event, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

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
            inputRef={field.ref}
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

SelectMulti.displayName = 'SelectMulti';