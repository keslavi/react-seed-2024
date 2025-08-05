import React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { DateMask } from './date-mask';

export const DateMaskVerification = () => {
  const methods = useForm({
    defaultValues: {
      testDate: '1234567890'
    }
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>DateMask Verification</h2>
        
        <DateMask
          name="testDate"
          label="Test Date"
          mask="MM/DD/YYYY"
          info="Test date with MM/DD/YYYY format"
        />
        
        <button type="submit">Submit</button>
        
        <div>
          <h3>Current Form Values:</h3>
          <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
        </div>
      </form>
    </FormProvider>
  );
};

export default DateMaskVerification; 