import { memo, useCallback, useMemo, useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import IconVisibility from "@mui/icons-material/Visibility";
import IconVisibilityOff from "@mui/icons-material/VisibilityOff";
import { LabelHeading, labelHeadingVariant } from "../label-heading";
import { inputMask } from "components";

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

// Function to create partial mask showing only last N characters
const createPartialMask = (value, maskPattern, showLast = 4) => {
  if (!value || !maskPattern) return value;
  
  // Apply the mask first to get the formatted value
  const formattedValue = applyMask(value, maskPattern);
  
  if (formattedValue.length <= showLast) {
    return formattedValue; // If value is shorter than showLast, show all
  }
  
  // Count the actual characters (excluding mask characters)
  const actualChars = value.replace(/[^a-zA-Z0-9]/g, '');
  
  if (actualChars.length <= showLast) {
    return formattedValue; // If actual characters are fewer than showLast, show all
  }
  
  // Create a mask pattern that shows asterisks for all but the last N characters
  let result = '';
  let actualCharIndex = 0;
  let lastChars = actualChars.slice(-showLast);
  let lastCharIndex = 0;
  
  for (let i = 0; i < maskPattern.length; i++) {
    const maskChar = maskPattern[i];
    
    if (maskChar === '#' || maskChar === 'A' || maskChar === '*') {
      // This is a character position
      if (actualCharIndex < actualChars.length - showLast) {
        // Mask this character
        result += '*';
      } else {
        // Show the actual character from the last N characters
        result += lastChars[lastCharIndex] || '*';
        lastCharIndex++;
      }
      actualCharIndex++;
    } else {
      // Static character from mask
      result += maskChar;
    }
  }
  
  return result;
};

export const LabelMask = memo((props) => {
  const timeoutRef = useRef(null);
  
  const [showValue, setShowValue] = useState(false);
  
  // Check if masking should be disabled (always show unmasked value)
  const isPersistent = props.persistent || props.alwaysVisible;

  // Get mask pattern from props or predefined patterns
  const maskPattern = useMemo(() => {
    if (props.mask) {
      // First check if it's a predefined pattern
      if (inputMask[props.mask]) {
        return inputMask[props.mask];
      }
      // If not found in predefined patterns, treat as custom string pattern
      return props.mask;
    }
    return null;
  }, [props.mask]);

  // Get the text value from props.text or children
  const textValue = useMemo(() => {
    if (props.text) {
      return props.text;
    }
    if (props.children) {
      // Convert children to string, handling various types
      return String(props.children);
    }
    return '';
  }, [props.text, props.children]);

  // Apply mask to display value
  const displayValue = useMemo(() => {
    if (!textValue) return '';
    
    if (maskPattern) {
      const formattedValue = applyMask(textValue, maskPattern);
      
      // If persistent or value is visible, show formatted value
      if (isPersistent || showValue) {
        return formattedValue;
      }
      
      // If value is hidden, check if partial masking is requested
      if (props.showLast && typeof props.showLast === 'number' && props.showLast > 0) {
        // Show partial mask with last N characters
        return createPartialMask(textValue, maskPattern, props.showLast);
      }
      
      // If value is hidden and no partial masking, show asterisks instead
      return maskPattern.replace(/[#A*]/g, '*');
    }
    
    return textValue;
  }, [textValue, maskPattern, showValue, isPersistent, props.showLast]);

  // Handle show/hide toggle (only if not persistent)
  const onClickShowValue = useCallback(() => {
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

  const onMouseDownShowValue = useCallback((event) => {
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

  // Check if we should use LabelHeading variants
  const useLabelHeading = props.variant && Object.values(labelHeadingVariant).includes(props.variant);

  // Base content with visibility icon
  const content = (
    <span style={{ ...props.style }}>
      <span>{displayValue}</span>
      {!isPersistent && textValue && (
        <IconButton
          aria-label="toggle value visibility"
          onClick={onClickShowValue}
          onMouseDown={onMouseDownShowValue}
          size="small"
          style={{ marginLeft: "8px" }}
          sx={{
            padding: '2px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          {showValue ? <IconVisibilityOff fontSize="small" /> : <IconVisibility fontSize="small" />}
        </IconButton>
      )}
    </span>
  );

  // If using LabelHeading variant, wrap with LabelHeading component
  if (useLabelHeading) {
    return (
      <LabelHeading 
        props={{
          ...props,
          children: content
        }}
      />
    );
  }

  // Otherwise return the content directly
  return content;
});

// Add display name for better debugging
LabelMask.displayName = 'LabelMask';

export default LabelMask;

