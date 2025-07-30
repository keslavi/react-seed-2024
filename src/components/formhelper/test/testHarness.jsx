import { useEffect } from "react";

import {
  FormProvider,
  Row,
  useFormProvider,
} from "components";

export const TestHarness = ({ item = {}, schema, children }) => {
  // React hook form and validation
  const formMethods = useFormProvider({
    resolver: schema,
    defaultValues: item,
  });
  const { reset } = formMethods;

  // Reset form with item when it changes
  useEffect(() => {
    if (item && Object.keys(item).length > 0) {
      reset(item);
    }
  }, [item, reset]);

  const onSubmit = (values) => {
    // Display submitted values in the textarea
    const textarea = document.getElementById('submit-results');
    if (textarea) {
      textarea.value = JSON.stringify(values, null, 2);
    }
    props.onSubmit?.(values);
  };

  return (
    <FormProvider {...{ formMethods, onSubmit }}>
        {children}
      <button
        type="submit"
      >
        Submit
      </button>
      <div>
        <label htmlFor="submit-results">submit results</label>
        <br />
        <textarea
          id="submit-results"
          rows={10}
          readOnly
          placeholder="Form submission results will appear here..."
          style={{
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '12px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
    </FormProvider >
  );
};

export default TestHarness; 