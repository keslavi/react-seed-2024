/** Props to strip from native/MUI element forwarding */
const EXCLUDED_KEYS = new Set([
  'name', 'id', 'charCount', 'checkbox', 'datepicker', 'defaultvalue',
  'error', 'helperText', 'info', 'label', 'lg', 'max', 'md', 'min',
  'onBlur', 'onChange', 'options', 'optionsMulti', 'optionsRadio',
  'optionsCheckbox', 'password', 'mask', 'format', 'persistent',
  'alwaysVisible', 'select', 'showLast', 'size', 'textarea', 'sm', 'xl', 'xs',
]);

export const cleanParentProps = (props: Record<string, any>): Record<string, any> => {
  const ret: Record<string, any> = { ...props };
  EXCLUDED_KEYS.forEach(k => { if (k in ret) delete ret[k]; });
  if (props.label && !props.placeholder) ret.placeholder = props.label;
  return ret;
};
