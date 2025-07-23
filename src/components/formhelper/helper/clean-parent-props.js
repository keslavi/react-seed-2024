import { useMemo } from 'react';
//import { clone } from '@/helpers';

export const cleanParentProps = (props) => {
  return useMemo(() => {
    const ret = { ...props };
    const exclude = [
      'name',
      "id",
      "checkbox",
      "datepicker",
      "defaultvalue",
      "error",
      "helperText",
      "info",
      "label",
      "lg",
      "max",
      "md",
      "min",
      "onBlur",
      "onChange",
      "options",
      "optionsMulti",
      "optionsRadio",
      "password",
      "mask",
      "format",
      "persistent",
      "alwaysVisible",
      "select",
      "showLast",
      "size",
      "sm",
      "xl",
      "xs",
    ];

    exclude.forEach(key => {
      if (ret[key]) {
        delete ret[key];
      }
    });

    if (props.label && !props.placeholder) {
      ret.placeholder = props.label;
    }

    return ret;
  }, [props]); // Only recalculate when props change
};