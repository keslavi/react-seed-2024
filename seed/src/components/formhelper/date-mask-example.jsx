import React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { Input } from './-input';

export const DateMaskExample = () => {
  const methods = useForm({
    defaultValues: {
      birthDate: '19851225',
      expiryDate: '20251231',
      customDate: '20230615'
    }
  });

  const onSubmit = (data) => {
    console.log(["datemask"],'Form data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>Date Mask Examples</h2>
        
        {/* Default MM/DD/YYYY format */}
        <Input
          name="birthDate"
          label="Birth Date"
          mask="MM/DD/YYYY"
          info="Enter your birth date in MM/DD/YYYY format"
        />
        
        {/* YYYY-MM-DD format */}
        <Input
          name="expiryDate"
          label="Expiry Date"
          mask="YYYY-MM-DD"
          info="Enter expiry date in YYYY-MM-DD format"
        />
        
        {/* Custom format */}
        <Input
          name="customDate"
          label="Custom Date"
          mask="DD/MM/YYYY"
          info="Enter date in DD/MM/YYYY format"
        />
        
        {/* With partial masking */}
        <Input
          name="secretDate"
          label="Secret Date"
          mask="MM/DD/YYYY"
          showLast={2}
          info="Shows only last 2 digits when masked"
        />
        
        {/* Persistent (always visible) */}
        <Input
          name="publicDate"
          label="Public Date"
          mask="YYYY-MM-DD"
          persistent
          info="Always visible, no masking"
        />
        
        {/* With min/max date validation */}
        <Input
          name="rangeDate"
          label="Date Range (2023-2024)"
          mask="MM/DD/YYYY"
          min="2023-01-01"
          max="2024-12-31"
          info="Only dates between 2023 and 2024 are allowed"
        />
        
        {/* With min date only */}
        <Input
          name="futureDate"
          label="Future Date"
          mask="YYYY-MM-DD"
          min={new Date().toISOString().split('T')[0]}
          info="Only future dates are allowed"
        />
        
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default DateMaskExample; 