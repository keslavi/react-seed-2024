import { memo, useCallback, useMemo } from "react";
import { TextField as MuiTextField } from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { ColPadded } from "@/components/grid";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

export const Datepicker = memo((props) => {
  const { 
    field, 
    errorMui, 
    valueProp,
  } = useFormField(props);

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
  }, [field, props]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        fullWidth
        type="date"
        id={field.name}
        name={field.name}
        label={props.label}
        inputRef={field.ref}
        onBlur={field.onBlur}
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
    </ColPadded>
  )

});

Datepicker.displayName = 'Datepicker';
