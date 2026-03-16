import { useMemo } from 'react';


export const cleanParentProps = (props) => {
  return useMemo(() => {
    const ret = { ...props };
    const exclude = [
      'name',
      "id",
      "charCount",
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
      "optionsCheckbox",
      "password",
      "mask",
      "format",
      "persistent",
      "alwaysVisible",
      "select",
      "showLast",
      "size",
      "textarea",
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
  }, [props]);
};