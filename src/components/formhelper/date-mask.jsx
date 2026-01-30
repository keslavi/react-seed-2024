import {inputMask} from "./text-mask";
import {color} from "@/theme-material";

import { memo, useCallback, useMemo, useState, useRef, useEffect } from "react";
import { TextField as MuiTextField,FormHelperText } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { ColPadded } from "@/components/grid";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

export const DateMask = memo((props) => {
  const { 
    field, 
    errorMui, 
    valueProp,
  } = useFormField(props);

  const [masked, setMasked]=useState(
    (valueProp && valueProp.value && String(valueProp.value).trim() !== '')
  );

  const timeoutRef = useRef(null);
  const helperTimeoutRef = useRef(null);

  const attributes = useMemo(() => {
    const attrs = { inputProps: {} };
    if (!isEmpty(props.min)){
      attrs.inputProps.min = dayjs(props.min).format('YYYY-MM-DD');
    }
    if (!isEmpty(props.max)){
      attrs.inputProps.max = dayjs(props.max).format('YYYY-MM-DD');
    }
    return attrs;
  }, [props.min, props.max]);

  const onChange = useCallback((e) => {
    field.onChange(e.target.value);
    props.onChange?.(e);
  }, []);

  const onFocus = useCallback((e) => {
    props.onFocus?.(e);
  }, []);

  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
    
    // Hide helper text after 1 second to give user time to click
    if (helperTimeoutRef.current) {
      clearTimeout(helperTimeoutRef.current);
    }
    helperTimeoutRef.current = setTimeout(() => {
    }, 1000); // 1 second
    
    // Set timer to mask the field after blur
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setMasked(true);
    }, 30000); // 30 seconds
  }, [field]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (helperTimeoutRef.current) {
        clearTimeout(helperTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        className={masked ? '' : 'hidden'}
        fullWidth
        readOnly
        id={`${field.name}-masked`}
        name={field.name}
        label={props.label}
        inputRef={field.ref}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        {...cleanParentProps(props)}
        //{...valueProp}
        value="**/**/****"
        {...errorMui}
        {...attributes}
        inputProps={{
          ...attributes.inputProps,
          style: { 
            cursor: 'pointer',
            ...attributes.inputProps?.style 
          }
        }}
      />
      <MuiTextField
        className={masked ? 'hidden' : (props.readOnly ? 'hidden' : '')}
        fullWidth
        type="date"
        id={field.name}
        name={field.name}
        label={props.label}
        inputRef={field.ref}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        {...cleanParentProps(props)}
        {...valueProp}
        {...errorMui}
        {...attributes}
        inputProps={{
          ...attributes.inputProps,
          style: { 
            cursor: 'pointer',
            ...attributes.inputProps?.style 
          }
        }}
      />
      <MuiTextField
        className={masked ? 'hidden' : (props.readOnly ? '' : 'hidden')}
        fullWidth
        readOnly
        id={`${field.name}-readonly`}
        name={field.name}
        label={props.label}
        inputRef={field.ref}
        onFocus={onFocus}
        onBlur={onBlur}
        {...cleanParentProps(props)}
        value={valueProp?.value ? dayjs(valueProp.value).format('MM/DD/YYYY') : ''}
        {...errorMui}
        {...attributes}
        inputProps={{
          ...attributes.inputProps,
          style: { 
            cursor: 'pointer',
            ...attributes.inputProps?.style 
          }
        }}
      />
      {/* {showHelper && ( */}
        <FormHelperText id={`${field.id}HelperText`}
          style={{
            color: color.primary.blue,
            cursor: 'pointer',
            fontSize: 'inherit',
          }}
          onClick={()=>{setMasked(!masked)}}
        >
          {masked ? 'Show' : 'hide'}
        </FormHelperText>
      {/* )}       */}
    </ColPadded>
  )

});

DateMask.displayName = 'DateMask';
