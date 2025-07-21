import React from 'react';
import { FormProvider, useFormProvider } from './form-provider';
import { TextMask } from './text-mask';
import { Button } from '@mui/material';

export const TextMaskExample = () => {
  const methods = useFormProvider({
    defaultValues: {
      ssn: '',
      phone: '',
      creditCard: '',
      zipCode: '',
      customMask: '',
      formattedValue: ''
    }
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Note: The stored values will be clean (without mask characters)
    // e.g., ssn: "123456789" instead of "123-45-6789"
  };

  return (
    <FormProvider formMethods={methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h2>TextMask Component Examples</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Predefined Masks</h3>
          
          <TextMask
            name="ssn"
            label="Social Security Number"
            mask="ssn"
            info="Enter your 9-digit SSN"
            xs={6}
          />
          
          <TextMask
            name="phone"
            label="Phone Number"
            mask="phone"
            info="Enter your phone number"
            xs={6}
          />
          
          <TextMask
            name="creditCard"
            label="Credit Card Number"
            mask="creditCard"
            info="Enter your 16-digit credit card number"
            xs={6}
          />
          
          <TextMask
            name="zipCode"
            label="Zip Code"
            mask="zipCodePlus4"
            info="Enter your ZIP+4 code"
            xs={6}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Custom Masks</h3>
          
          <TextMask
            name="customMask"
            label="Custom Pattern (##-##-##)"
            mask="##-##-##"
            info="Custom 6-digit pattern with dashes"
            xs={6}
          />
          
          <TextMask
            name="formattedValue"
            label="Formatted Value (####-####)"
            format="####-####"
            info="This uses format instead of mask"
            xs={6}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Available Predefined Patterns</h3>
          <ul>
            <li><strong>ssn:</strong> ###-##-####</li>
            <li><strong>phone:</strong> (###) ###-####</li>
            <li><strong>phoneExt:</strong> (###) ###-#### x####</li>
            <li><strong>creditCard:</strong> #### #### #### ####</li>
            <li><strong>creditCardExpiry:</strong> ##/##</li>
            <li><strong>zipCode:</strong> #####</li>
            <li><strong>zipCodePlus4:</strong> #####-####</li>
            <li><strong>date:</strong> ##/##/####</li>
            <li><strong>time:</strong> ##:##</li>
            <li><strong>currency:</strong> $#,###.##</li>
            <li><strong>percentage:</strong> ##%</li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Mask Characters</h3>
          <ul>
            <li><strong>#:</strong> Only allows digits (0-9)</li>
            <li><strong>A:</strong> Only allows letters (a-z, A-Z)</li>
            <li><strong>*:</strong> Allows any character</li>
            <li><strong>Any other character:</strong> Static character that appears in the mask</li>
          </ul>
        </div>

        <Button type="submit" variant="contained" color="primary">
          Submit Form
        </Button>
      </form>
    </FormProvider>
  );
};

export default TextMaskExample; 