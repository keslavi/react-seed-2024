import { memo, useCallback,useMemo } from "react";
import { useFormField } from "./form-provider";

import {
  TextField as MuiTextField,
  Autocomplete as MuiAutocomplete,
  InputLabel as MuiInputLabel,
} from "@mui/material";

import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";

import { ColPadded } from "@/components/grid";
import IconKeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

export const SelectAutocomplete = memo((props) => {
  const options=useMemo(()=>props.options||[],[]);
  const { 
    field, 
    errorMui 
  } = useFormField(props);
  
  const onBlur=useCallback((e)=>{
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  },[]);

  const onChange=useCallback((e,newValue)=>{
    if(newValue){
      field.onChange(newValue.key);
    }else{
      field.onChange(null);
    }
    props.onChange?.(e,newValue);
  },[]);
  
  
  // Update isCleared state when field.value changes
  const isCleared = !field.value || field.value === "" || field.value === null || field.value === undefined;
  const placeholder=props.placeholder===undefined ? "Please Select" : props.placeholder;

  // Find the selected option only if field.value exists and is not undefined
  const selectedOption = useMemo(() => {
    if (isCleared || field.value === undefined || field.value === null || field.value === "") {
      return null;
    }
    return options.find(option => option.key == field.value) || null;
  }, [field.value, options, isCleared]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiAutocomplete
        id={field.name}
        name={field.name}
        options={options}
        getOptionLabel={(option) => option?.text || ""}
        onChange={(event, newValue) => {onChange(event, newValue);}}
        onBlur={onBlur}
        value={selectedOption}
        fullWidth
        popupIcon={<IconKeyboardArrowDown />}
        renderInput={(params) => {
          return (
            <>
              <MuiTextField
                {...params}
                label={props.label}
                placeholder={placeholder}
                {...errorMui}
                slots={{
                  inputLabel: (inputLabelProps) => (
                    <MuiInputLabel {...inputLabelProps} shrink={true} />
                  )
                }}
              />
              {props.info && <Info id={`${field.id}Info`} info={props.info} />}
            </>
          );
        }}
        {...cleanParentProps(props)}
      />
    </ColPadded>
  );
});

SelectAutocomplete.displayName = 'SelectAutocomplete';
