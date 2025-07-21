import { memo, useCallback, useMemo, useState, useEffect, useRef } from "react";
import { TextField as MuiTextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { cleanParentProps, colProps } from "./helper";
import { useFormField } from "./form-provider";
import { Info } from "./info";
import { ColPadded } from "@/components/grid";

// Utility functions for masking and formatting
const applyMask = (value, mask) => {
  if (!value || !mask) return value;
  
  // Remove all non-alphanumeric characters from input
  const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '');
  let result = '';
  let valueIndex = 0;
  
  for (let i = 0; i < mask.length && valueIndex < cleanValue.length; i++) {
    const maskChar = mask[i];
    
    if (maskChar === '#') {
      // Only allow digits
      if (/\d/.test(cleanValue[valueIndex])) {
        result += cleanValue[valueIndex];
        valueIndex++;
      } else {
        break;
      }
    } else if (maskChar === 'A') {
      // Only allow letters
      if (/[a-zA-Z]/.test(cleanValue[valueIndex])) {
        result += cleanValue[valueIndex];
        valueIndex++;
      } else {
        break;
      }
    } else if (maskChar === '*') {
      // Allow any character
      result += cleanValue[valueIndex];
      valueIndex++;
    } else {
      // Static character from mask
      result += maskChar;
    }
  }
  
  return result;
};

const applyFormat = (value, format) => {
  if (!value || !format) return value;
  
  // Remove all non-alphanumeric characters from input
  const cleanValue = value.replace(/[^a-zA-Z0-9]/g, '');
  let result = '';
  let valueIndex = 0;
  
  for (let i = 0; i < format.length && valueIndex < cleanValue.length; i++) {
    const formatChar = format[i];
    
    if (formatChar === '#') {
      result += cleanValue[valueIndex] || '';
      valueIndex++;
    } else if (formatChar === 'A') {
      result += cleanValue[valueIndex] || '';
      valueIndex++;
    } else {
      result += formatChar;
    }
  }
  
  return result;
};

const removeMask = (value, mask) => {
  if (!value || !mask) return value;
  
  // For removal, we just extract alphanumeric characters
  return value.replace(/[^a-zA-Z0-9]/g, '');
};

// Predefined mask patterns
const MASK_PATTERNS = {
  ssn: '###-##-####',
  phone: '(###) ###-####',
  phoneExt: '(###) ###-#### x####',
  creditCard: '#### #### #### ####',
  creditCardExpiry: '##/##',
  zipCode: '#####',
  zipCodePlus4: '#####-####',
  date: '##/##/####',
  time: '##:##',
  currency: '$#,###.##',
  percentage: '##%'
};

export const TextMask = memo((props) => {
  const [showValue, setShowValue] = useState(false);
  const timeoutRef = useRef(null);
  
  const { 
    field, 
    errorMui, 
    valueProp,
  } = useFormField(props);
  
  // Check if masking should be disabled (always show unmasked value)
  const isPersistent = props.persistent || props.alwaysVisible;

  // Get mask pattern from props or predefined patterns
  const maskPattern = useMemo(() => {
    if (props.mask) {
      // First check if it's a predefined pattern
      if (MASK_PATTERNS[props.mask]) {
        return MASK_PATTERNS[props.mask];
      }
      // If not found in predefined patterns, treat as custom string pattern
      return props.mask;
    }
    return null;
  }, [props.mask]);

  // Get format pattern
  const formatPattern = useMemo(() => {
    if (props.format) {
      // First check if it's a predefined pattern
      if (MASK_PATTERNS[props.format]) {
        return MASK_PATTERNS[props.format];
      }
      // If not found in predefined patterns, treat as custom string pattern
      return props.format;
    }
    return null;
  }, [props.format]);

  // Apply mask/format to display value
  const displayValue = useMemo(() => {
    const rawValue = field.value || '';
    
    if (maskPattern) {
      const formattedValue = applyMask(rawValue, maskPattern);
      // If persistent or value is visible, show formatted value
      if (isPersistent || showValue || !rawValue) {
        return formattedValue;
      }
      // If value is hidden, show asterisks instead
      return maskPattern.replace(/[#A*]/g, '*');
    }
    
    if (formatPattern) {
      const formattedValue = applyFormat(rawValue, formatPattern);
      // If persistent or value is visible, show formatted value
      if (isPersistent || showValue || !rawValue) {
        return formattedValue;
      }
      // If value is hidden, show asterisks instead
      return formatPattern.replace(/[#A*]/g, '*');
    }
    
    return rawValue;
  }, [field.value, maskPattern, formatPattern, showValue, isPersistent]);

  const onBlur = useCallback((e) => {
    field.onBlur(e.target.value);
    props.onBlur?.(e);
  }, [field, props]);

  const onChange = useCallback((e) => {
    let newValue = e.target.value;
    
    // If using mask, remove mask characters for storage
    if (maskPattern) {
      newValue = removeMask(newValue, maskPattern);
    }
    
    // If using format, clean the value
    if (formatPattern) {
      newValue = newValue.replace(/[^a-zA-Z0-9]/g, '');
    }
    
    field.onChange(newValue);
    props.onChange?.(e);
    
    // Reset the auto-mask timer when user types (only if not persistent)
    if (showValue && !isPersistent) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShowValue(false);
      }, 30000); // 30 seconds
    }
  }, [field, props, maskPattern, formatPattern, showValue, isPersistent]);

  // Handle show/hide toggle (only if not persistent)
  const handleClickShowValue = useCallback(() => {
    if (isPersistent) return; // No toggle for persistent fields
    
    const newShowValue = !showValue;
    setShowValue(newShowValue);
    
    // Set up auto-mask timer when showing value
    if (newShowValue) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShowValue(false);
      }, 30000); // 30 seconds
    } else {
      // Clear timer when manually hiding
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [showValue, isPersistent]);

  const handleMouseDownShowValue = useCallback((event) => {
    event.preventDefault();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <ColPadded {...colProps(props)}>
      <MuiTextField
        fullWidth
        id={field.name}
        name={field.name}
        label={props.label}
        inputRef={field.ref}
        onBlur={onBlur}
        onChange={onChange}
        value={displayValue}
        {...cleanParentProps(props)}
        {...errorMui}
        InputProps={{
          endAdornment: !isPersistent ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle value visibility"
                onClick={handleClickShowValue}
                onMouseDown={handleMouseDownShowValue}
                edge="end"
              >
                {showValue ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
      />
      {props.info && <Info id={`${field.id}Info`} info={props.info} />}
    </ColPadded>
  );
});

// Add display name for better debugging
TextMask.displayName = 'TextMask';

export default TextMask; 