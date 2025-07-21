import { memo, useCallback } from "react";
import { useFormField } from "./form-provider";
import { 
  TextareaAutosize,
  InputLabel,
  FormHelperText, 
} from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";

export const Textarea = memo((props) => {
  const { 
    field, 
    errorMui, 
    valueProp,
  } = useFormField(props);

  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, [field, props]);

  const onChange = useCallback((e) => {
    field.onChange(e.target.value);
    props.onChange?.(e);
  }, [field, props]);

  return (
    <ColPadded {...colProps(props)}>
      <InputLabel htmlFor={field.name}>{props.label}</InputLabel>
      <TextareaAutosize
        style={{width: "100%"}}
        id={field.name}
        name={field.name}
        // minRows={3}
        // maxRows={6}
        ref={field.ref}
        onBlur={onBlur}
        onChange={onChange}
        {...cleanParentProps(props)}
        {...valueProp}
        {...errorMui}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
      {props.helperText && <FormHelperText error>{errorProps.helperText}</FormHelperText>}
    </ColPadded>
  );

});

// Add display name for better debugging
Textarea.displayName = 'Textarea';
