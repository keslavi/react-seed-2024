import { useMemo, useState } from "react";
import { useFormField } from "./form-provider";

import {
  Box,
  TextField as MuiTextField,
  Autocomplete as MuiAutocomplete,
} from "@mui/material";

import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";

import { ColPadded } from "@/components";
import IconKeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

export const SelectAutocompleteFreesolo = (props) => {
  const [inputValue, setInputValue] = useState('');
  const onChange = props.onChange || (() => {});
  const options = useMemo(() => props.options || [], [props.options]);

  const { field, error } = useFormField(props);

  const errorProps = useMemo(() => {
    const hasFormError = !!error;
    const directError = props.error;
    
    return {
      error: hasFormError || !!directError || undefined,
      helperText: hasFormError ? error?.message : (directError?.message || directError)
    };
  }, [error, props.error]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiAutocomplete
        id={field.name}
        name={field.name}
        options={options}
        freeSolo={true}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          return option.text || "";
        }}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            field.onChange(newValue);
            onChange(event, { text: newValue, isCustom: true });
          } else if (newValue && newValue.key) {
            field.onChange(newValue.text);
            onChange(event, newValue);
          } else {
            field.onChange('');
            onChange(event, null);
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        inputValue={inputValue}
        onBlur={field.onBlur}
        value={field.value || ''}
        fullWidth
        popupIcon={<IconKeyboardArrowDown />}
        renderInput={(params) => {
          return (
            <Box sx={{position:'relative'}}>
              <MuiTextField
                {...params}
                label={props.label}
                placeholder={props.placeholder}
                {...errorProps}
              />
              {props.info && <Info id={`${field.id}Info`} info={props.info} />}
            </Box>
          );
        }}
        {...cleanParentProps(props)}
      />
    </ColPadded>
  );
};

SelectAutocompleteFreesolo.displayName = 'SelectAutocompleteFreesolo';