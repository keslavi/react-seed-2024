
import { memo, useCallback, useMemo, useState } from "react";
import { TextField, Autocomplete as MuiAutocomplete } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";

export const SelectMulti = memo((props) => {
  const { field, errorMui } = useFormField(props);

  const [inputValue, setInputValue] = useState("");

  // Handle placeholder logic like select-autocomplete
  const placeholder = props.placeholder === undefined ? "Please Select" : props.placeholder;

  const selectedOptions = useMemo(() => {
    return Array.isArray(field.value)
      ? props.optionsMulti.filter((opt) => field.value.includes(opt.key))
      : [];
  }, [field.value, props.optionsMulti]);

  // Filter out already selected options from dropdown
  const filteredOptions = useMemo(() => {
    const selectedKeys = Array.isArray(field.value) ? field.value : [];
    return props.optionsMulti.filter(option => !selectedKeys.includes(option.key));
  }, [field.value, props.optionsMulti]);

  const onBlur = useCallback((e) => {
    field.onBlur();
    props.onBlur?.(e);
  }, []);

  const onChange = useCallback((e, newValue) => {
    const selectedValues = Array.isArray(newValue)
      ? newValue.map((item) => item.key)
      : [];
    field.onChange(selectedValues);
    props.onChange?.(selectedValues);
  }, []);

  // Handle input change to manage placeholder visibility
  const onInputChange = useCallback((event, newInputValue) => {
    setInputValue(newInputValue);
  }, []);

  // Show placeholder when no options are selected and input is empty
  const shouldShowPlaceholder = selectedOptions.length === 0 && inputValue === "";

  return (
    <ColPadded {...colProps(props)}>
      <MuiAutocomplete
        id={field.name}
        name={field.name}
        multiple
        onBlur={onBlur}
        onChange={onChange}
        onInputChange={onInputChange}
        inputValue={inputValue}
        options={filteredOptions}
        getOptionLabel={(option) => option?.text || ""}
        isOptionEqualToValue={(option, value) => option?.key === value?.key}
        popupIcon={<KeyboardArrowDownIcon />}
        value={selectedOptions}
        data-testid={props['data-testid']}
        {...cleanParentProps(props)}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={field.ref}
            label={props.label}
            placeholder={shouldShowPlaceholder ? placeholder : ""}
            variant="outlined"
            fullWidth
            {...errorMui}
          />
        )}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
    </ColPadded>
  );
});

// Add display name for better debugging
SelectMulti.displayName = 'SelectMulti';
 

