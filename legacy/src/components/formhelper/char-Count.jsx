import { memo, useCallback, useMemo, useEffect } from "react";
import {
  FormHelperText,
  TextField as MuiTextField
} from "@mui/material";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";
import { color } from "@/theme-material";

const CharMessage = ({ msg, withinLimit, children }) => {

  return (
    <>
      <span style={{ color: withinLimit ? color.primary.text : color.primary.red }}>
        {msg}
      </span>
      {children && <><br/>{children}</>}
    </>
  );
};

export const CharCount = memo((props) => {
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

  // Extract input-specific props that need to be passed to the input element
  const inputProps = useMemo(() => {
    const {
      readOnly,
      maxLength,
      minLength,
      pattern,
      autoFocus,
      spellCheck,
      inputMode,
      autoComplete,
      ...restProps
    } = props;

    return {
      readOnly,
      maxLength,
      minLength,
      pattern,
      spellCheck,
      inputMode,
      autoComplete,
      autoFocus: props.autoFocus,
    };
  }, [props]);

  // Calculate character count and determine styling
  const currentLength = field.value?.length || 0;
  const isWithinLimit = currentLength <= props.charCount;
  const msgChars = `${currentLength} / ${props.charCount} characters`;
  const className = isWithinLimit ? "primaryText" : "Mui-error";

  // Watch for form submission and prevent if character limit exceeded
  useEffect(() => {
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
      //console.log(["all"], "Form submit listener attached");

      return () => {
        formElement.removeEventListener('submit', handleFormSubmit, true);
        //console.log(["all"], "Form submit listener removed");
      };
    } else {
      console.warning(" charCount: No form element found for submit listener");
    }
  }, [isWithinLimit, currentLength, props.charCount, field.ref]);

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        fullWidth
        id={field.name}
        name={field.name}
        label={props.label}
        {...(props.placeholder && { placeholder: props.placeholder })}
        inputRef={field.ref}
        onBlur={onBlur}
        onChange={onChange}
        autoFocus={props.autoFocus}
        {...cleanParentProps(props)}
        {...valueProp}
        inputProps={inputProps}
        {...(errorMui?.error || !isWithinLimit ? { error: true } : {})}
        helperText={
          <CharMessage
            msg={msgChars}
            withinLimit={isWithinLimit}
            children={errorMui.helperText}
          >
          </CharMessage>
        }

        // helperText={<>
        //   {msgChars}
        //   {errorMui?.helperText && <>
        //     <br />{errorMui.helperText}
        //   </>}
        // </>}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
      {/* <FormHelperText
        className={className}
      >
        {currentLength} / {props.charCount} characters
      </FormHelperText>
      {errorMui && <FormHelperText className="Mui-error">{errorMui.helperText}</FormHelperText>} */}
    </ColPadded>
  );
});

// Add display name for better debugging
CharCount.displayName = 'CharCount';
