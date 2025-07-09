import React, { useCallback, useMemo, useState } from "react";
import { TextField, Autocomplete, Checkbox } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { useFormField } from "./form-provider";
import { ColPadded } from "@/components/grid";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useFormContext } from "./form-provider";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const SelectCheckbox = React.memo((props) => {
  const {
    optionscheckbox: options,
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

  // Memoize event handlers to prevent recreation on every render
  const handleBlur = useCallback((e) => {
    field.onBlur();
    onBlur(e);
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

  // Memoize error props to prevent object recreation
  const errorProps = useMemo(() => {
    // Form field error takes precedence over directly passed error prop
    const hasFormError = !!error;
    const directError = props.error;
    
    return {
      error: hasFormError || !!directError || undefined,
      helperText: hasFormError ? error?.message : (directError?.message || directError)
    };
  }, [error, props.error]);

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
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option?.text || ""}
        isOptionEqualToValue={(option, value) => option?.key == value?.key}
        renderOption={(props, option, { selected }) => {
          // Destructure the key from props to use it separately
          const { key, ...rest } = props;
          return (
            <li key={key} {...rest}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.text}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={field.ref}
            label={label}
            placeholder={shouldShowPlaceholder ? placeholder : ""}
            variant="outlined"
            {...errorProps}
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
SelectCheckbox.displayName = 'SelectCheckbox';