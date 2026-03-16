import { memo, useCallback, useMemo } from 'react';
import { TextField as MuiTextField } from '@mui/material';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { cleanParentProps } from './helper/clean-parent-props';
import { colProps } from './helper/col-props';
import { useFormField, UseFormFieldProps } from './form-provider';
import { ColPadded } from '../grid';

export type DatepickerProps = UseFormFieldProps & {
  label?: string;
  min?: string;
  max?: string;
  size?: number | string;
};

export const Datepicker = memo((props: DatepickerProps) => {
  const { field, errorMui, valueProp } = useFormField(props);

  const attributes = useMemo(() => {
    const inputProps: Record<string, string> = {};
    if (!isEmpty(props.min)) inputProps.min = dayjs(props.min).format('YYYY-MM-DD');
    if (!isEmpty(props.max)) inputProps.max = dayjs(props.max).format('YYYY-MM-DD');
    return inputProps;
  }, [props.min, props.max]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
    props.onChange?.(e as any);
  }, [field, props.onChange]);

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
        slotProps={{
          htmlInput: {
            ...attributes,
            style: { cursor: 'pointer' },
          },
        }}
      />
    </ColPadded>
  );
});

Datepicker.displayName = 'Datepicker';
