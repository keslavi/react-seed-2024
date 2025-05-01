import { createContext, useContext, useMemo } from "react";
import { useForm, useController as useRealController } from "react-hook-form";

const FormContext = createContext();

export const FormProvider = ({ children, ...methods }) => {
  // Destructure everything you might need
  const {
    control,
    formState: { errors },
    formState,
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = methods;

  // Memoized context value
  const value = useMemo(
    () => ({
      control,
      errors,
      reset,
      register,
      handleSubmit,
      watch,
      setValue,
      getValues,
      // Include original methods object for edge cases
      formMethods: methods,
    }),
    [methods]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useController = (props) => {
  const ctx = useContext(FormContext);
  const control = props.control || ctx.control;
  const errors = props.errors || ctx.errors;

  const controllerProps = useMemo(
    () => ({
      control,
      errors,
      name: props.name,
    }),
    [control, errors, props.name]
  );

  //argued with myself about not paring it down to field, error.
  const ret = useRealController({
    ...controllerProps,
  });

  return ret;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("Missing FormProvider");
  return context;
};

// Enhanced hook with validation support
export const useFormProvider = (options = {}) => {
  return useForm({
    // Default values
    defaultValues: options.defaultValues || {},
    // Validation resolver (Yup, Zod, etc.)
    resolver: options.resolver,
    // All other useForm() options
    ...options,
  });
};
