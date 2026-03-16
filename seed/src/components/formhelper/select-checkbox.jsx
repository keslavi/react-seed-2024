import { memo, useCallback,useMemo } from "react";
import { TextField, Autocomplete as MuiAutocomplete, Checkbox } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { useFormField } from "./form-provider";
 
import { ColPadded } from "@/components/grid";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
 
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
 
export const SelectCheckbox = memo((props) => {
  const {
    optionsCheckbox: options,
    label,
    info,
    defaultvalue,
    ...restProps
  } = props;

  const {
    field,
    /*error,*/
    errorMui,
    //valueProp
  } = useFormField(props);
 
  // Memoize event handlers to prevent recreation on every render
  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, []);
 
  const onChange = useCallback((e, newValue) => {
    const selectedValues = Array.isArray(newValue)
      ? newValue.map((item) => item.key)
      : [];
    field.onChange(selectedValues);
    props.onChange?.(selectedValues);
  }, []);
 
  const selectedOptions = useMemo(() => {
    if (!Array.isArray(field.value) || !Array.isArray(options)) {
      return [];
    }
    return options.filter((opt) => field.value.includes(opt.key));
  }, [field.value, options]);

  // Ensure value is always defined to prevent controlled/uncontrolled switching
  const autocompleteValue = selectedOptions || [];
 
  return (
    <ColPadded {...colProps(props)}>
      <MuiAutocomplete
        id={field.name}
        name={field.name}
        multiple
        onBlur={onBlur}
        onChange={(e, newValue) => onChange(e, newValue)}
        options={Array.isArray(options) ? options : []}
        disableCloseOnSelect
        popupIcon={<KeyboardArrowDownIcon />}
        getOptionLabel={(option) => option?.text || ""}
        isOptionEqualToValue={(option, value) => option?.key === value?.key}
        data-testid={props['data-testid'] || "autocomplete-component"}
        value={autocompleteValue}
        {...cleanParentProps(restProps)}
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
            variant="outlined"
            placeholder={selectedOptions.length === 0 ? "Please Select" : ""}
            {...errorMui}
          />
        )}
      />
      {info && <Info id={`${field.id}Info`} info={info} />}
    </ColPadded>
  );
});

// Add display name for better debugging
SelectCheckbox.displayName = 'SelectCheckbox';

