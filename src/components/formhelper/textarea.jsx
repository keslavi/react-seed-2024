import { memo, useCallback, useEffect } from "react";
import { useFormField } from "./form-provider";
import {
  TextareaAutosize,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";
import { color } from "@/theme-material";

export const Textarea = memo((props) => {
  const {
    field,
    errorMui,
    valueProp,
  } = useFormField(props);

  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, []);

  const onChange = useCallback((e) => {
    field.onChange(e.target.value);
    props.onChange?.(e);
  }, []);

  // Character count logic (only if charCount prop is provided)
  const currentLength = field.value?.length || 0;
  const isWithinLimit = props.charCount ? currentLength <= props.charCount : true;
  const msgChars = `${currentLength} / ${props.charCount} characters`;
  const className = props.charCount ? (isWithinLimit ? "primaryText" : "Mui-error") : "";

  // Watch for form submission and prevent if character limit exceeded
  useEffect(() => {
    if (!props.charCount) return; // Only apply if charCount is provided

    const handleFormSubmit = (event) => {
      if (!isWithinLimit) {
        event.preventDefault();
        event.stopPropagation();
        //console.log(["wsc"], `Form submission blocked: Character count ${currentLength} exceeds limit of ${props.charCount}`);
        return false;
      }
    };

    // Find the form element using multiple approaches
    let formElement = null;

    // Try to find form through field ref
    if (field.ref?.current) {
      formElement = field.ref.current.closest('form');
    }

    // If not found, try to find form through document
    if (!formElement) {
      formElement = document.querySelector('form');
    }

    if (formElement) {
      formElement.addEventListener('submit', handleFormSubmit, true); // Use capture phase
      return () => {
        formElement.removeEventListener('submit', handleFormSubmit, true);
      };
    } else {
      console.warning(" textarea: No form element found for submit listener");
    }
  }, [isWithinLimit, currentLength, props.charCount, field.ref]);

  // Determine label styling based on error state and character count
  const getLabelStyle = () => {
    if (errorMui?.error || (props.charCount && !isWithinLimit)) {
      return { color: color.primary.red };
    }
    return {};
  };

  return (
    <ColPadded {...colProps(props)}>
      <InputLabel htmlFor={field.name} style={getLabelStyle()}>{props.label}</InputLabel>
      <TextareaAutosize
        style={{
          width: "100%",
          border: errorMui?.error || (props.charCount && !isWithinLimit)
            ? `1px solid ${color.primary.red}`
            : `1px solid ${color.cobe1.grey}`,
          borderRadius: '4px',
          padding: '8px',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit',
          fontSize: '14px',
          lineHeight: '1.5',
          color: errorMui?.error || (props.charCount && !isWithinLimit)
            ? color.primary.red
            : 'inherit',
        }}
        id={field.name}
        name={field.name}
        {...(props.minRows && { minRows: props.minRows })}
        ref={field.ref}
        onBlur={onBlur}
        onChange={onChange}
        {...cleanParentProps(props)}
        {...valueProp}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
      {props.charCount && (
        <FormHelperText
          className={className}
          style={{ marginTop: '-2px' }}
        >
          {msgChars}
        </FormHelperText>
      )}
      {errorMui &&
        <FormHelperText
          className="Mui-error"
          style={{ marginTop: '-5px' }}
        >
          {errorMui.helperText}
        </FormHelperText>}
    </ColPadded>
  );

});

Textarea.displayName = 'Textarea';
